import React, { useEffect } from 'react';

import Table from './Table.js';
import RoundTimer from './RoundTimer.js'

export default function Round(props) {

    const formatDateStart = (proposition) => {
        return `${new Date(proposition).getHours().toString().padStart(2, '0')}:${new Date(proposition).getMinutes().toString().padStart(2, '0')}`
    }

    let proposition = (new Date().getTime() + 15 * 60 * 1000) - ((new Date().getTime() + 15 * 60 * 1000) % (5*60*1000));
    let [dateStart, setDateStart] = React.useState(formatDateStart(proposition));
    console.log(dateStart);

    React.useEffect(() => {
        setDateStart(formatDateStart(proposition))
    }, [proposition])

    const handleDateStartChange = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        setDateStart(event.target.value);
    }

    const HHmmss_time = (duration, type) => {
        let positive = duration >= 0;
        if(!positive) {
            duration = -duration
        }
        duration = parseInt(duration / 1000);
        const SS = duration % 60;
        duration = parseInt(duration / 60);
        const MM = duration % 60;
        duration = parseInt(duration / 60);
        
        if(type == "timer") {
            return `${positive ? '' : '-'}${duration.toString().padStart(2, '0')}:${MM.toString().padStart(2, '0')}:${SS.toString().padStart(2, '0')}`;
        } else if(type == "spoken") {
            if(duration == 0) {
                if(MM == 0) {
                    return `${positive ? '' : '-'}${SS} seconde${SS > 1 ? 's' : ''}`
                } else {
                    return `${positive ? '' : '-'}${MM} minute${MM > 1 ? 's' : ''} et ${SS} seconde${SS > 1 ? 's' : ''}`
                }
            } else {
                return `${positive ? '' : '-'}${duration} heure${duration > 1 ? 's' : ''}, ${MM} minute${MM > 1 ? 's' : ''} et ${SS} seconde${SS > 1 ? 's' : ''}`
            }
        }
    }

    const get_other_result = function(table, player) {
        let player1_name = undefined;
        let player2_name = undefined;
        let other_table = undefined;

        /*console.log("Called with :");
        console.log("table = "+ table);
        console.log("player = "+ player);*/

        for(let result of props.results) {
            if(result["table"] == table) {
                player1_name = result["player1"];
                player2_name = result["player2"];
                other_table = result["table"];
                break;
            } else if(result["player1"] == player || result["player2"] == player) {
                player1_name = result["player1"];
                player2_name = result["player2"];
                other_table = result["table"];
                break;
            }
        }

        let player1 = undefined;
        let player2 = undefined;

        for(let player of props.players) {
            if(player["name"] == player1_name) {
                player1 = player;
                if(player2 !== undefined)
                    return [player1, player2, other_table];
            } else if(player["name"] == player2_name) {
                player2 = player;
                if(player1 !== undefined)
                    return [player1, player2, other_table];
            }
        }

        /*console.log("Returning");
        console.log([player1, player2, table]);*/

        return [player1, player2, other_table];
    }

    console.log(props.players)

    let is_finished = props.results.reduce((accumulator, result) => accumulator && result["state"] == "Terminé", true);
    if (props.results === undefined) {
        return;
    } else {
        return (
            <div>
                <div className="row mt-5">
                    <h2 className='mb-4'>Round {props.round["round_number"]} - {props.round["scenario"]} ({props.round["state"]})</h2>
                </div>
                {props.round["started_at"] !== undefined && !is_finished && props.round["state"] == "En cours" && (
                    <RoundTimer started_at={props.round["started_at"]} last_turn={props.round["started_at"] + 2*60*60*1000 + 15*60*1000} HHmmss_time={HHmmss_time} />
                )}
                {props.results.map(result => {
                    return <Table result={result} players={props.players} key={`R${result["round_number"]}T${result["table"]}`}
                            saveScore={props.saveScore} handleEditRound={props.handleEditRound} get_other_result={get_other_result}
                            handleEditAppariement={props.handleEditAppariement} tables_names={props.tables_names} detailedView={props.detailedView} are_same_affinity={props.are_same_affinity}
                            HHmmss_time={HHmmss_time} />;
                })}
            
                {props.round["state"] == "Prêt à commencer" && (
                <form>
                    <div className="row">
                        <div className="col text-end">
                            <button type="button" className='btn btn-danger mt-2 mx-3' round={props.round["round_number"]} onClick={props.handleBackToPairs}>Revenir à l'appariement</button>
                            <button type="button" className='btn btn-success mt-2 mx-3' round={props.round["round_number"]} onClick={props.handleStartRound} datestart={dateStart}>Commencer le round</button>
                            <label htmlFor="dateStart" className='mt-5 mx-3'>Début des parties</label>
                            <input className='mt-5 mx-2' type="time" name="dateStart" id="dateStart" value={dateStart} onChange={handleDateStartChange} />
                        </div>
                    </div>
                </form>
                )}

                {props.round["state"] == "En cours" && (
                <form>
                    <div className="row">
                        <div className="col text-end">
                            {is_finished && props.results.length == props.players.filter((player) => player["opponents_played"].length < props.round["round_number"] || player["opponents_played"][props.round["round_number"] - 1] !== 0).length/2 ?
                                <button type="button" className='btn btn-success mt-5' round={props.round["round_number"]} onClick={props.handleEndRound}>Terminer le round</button>
                            :
                                <button type="button" className='btn btn-warning mt-5 disabled' round={props.round["round_number"]} title="Des tables n'ont pas encore fini" disabled>Terminer le round</button>
                            }
                        </div>
                    </div>
                </form>
                )}

                {props.round["state"] == "Création en cours" && props.players.length == 0 && (
                    <p>Aucun joueur inscrit</p>
                )}
            </div>
        )
    }
}