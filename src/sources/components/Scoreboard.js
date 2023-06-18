import React, { useEffect } from 'react';

export default function Scoreboard(props) { // players_data, rounds_data
    
    let last_round = props.rounds_data.length - 1 >= 0 ? props.rounds_data[props.rounds_data.length - 1]["round_number"] - 1 : -1;
    let round_shown = props.rounds_data.map((elt) => false);
    let player_shown = props.players_data.map((elt) => false)
    if(last_round == -1) {
        return (
            <div className='row'>
                <div className='col text-center'>Aucun résultat pour le moment</div>
            </div>
        );
    }

    //console.log("Players :")
    //console.log(props.players_data)
    
    return (
        <div className="container-fluid">
            {props.players_data.sort((a, b) => b["results_with_goalaverage"][last_round] - a["results_with_goalaverage"][last_round]).map((player, i) => {
                return (
                    <div className='row mb-2' key={player["name"]} style={{overflow: 'auto', width: `${props.rounds_data.length > 2 ? 50*props.rounds_data.length : 100}%`, minWidth: props.resultats_finaux ? 350*props.rounds_data.length : 500*props.rounds_data.length}}>

                        {props.rounds_data.map((round) => {
                            return (
                                <div className='col' key={round["round_number"]}>
                                    {!round_shown[round["round_number"] - 1] && <div>
                                        <div className='row'>
                                            <div className="col text-center">Round {round["round_number"]} - {round["scenario"]}</div>
                                        </div>
                                        <div className='row'>
                                            {!player_shown[i] && <div className="col text-center">Joueur</div>}
                                            <div className="col text-center">Score</div>
                                            <div className="col text-center">Goalaverage</div>
                                            <div className="col text-center">Score total</div>
                                            {!props.resultats_finaux && 
                                                <div className="col text-center">Adversaire</div>}
                                            {!props.resultats_finaux && <div className="col text-center">Table</div>}
                                        </div>
                                    </div>} {round_shown[round["round_number"] - 1] = true}
                                    <div className='row'>
                                        {!player_shown[i] && <div className="col text-center">{player["name"]}</div>} {player_shown[i] = true}
                                        <div className="col text-center">{player["points"][round["round_number"] - 1]}</div>
                                        <div className="col text-center">{player["goalaverages"][round["round_number"] - 1]}</div>
                                        <div className="col text-center">{player["results_with_goalaverage"][round["round_number"] - 1].toFixed(2)}</div>
                                            {!props.resultats_finaux && 
                                            <div className="col text-center">{player["opponents_played"][round["round_number"] - 1] === 0 ? "" : player["opponents_played"][round["round_number"] - 1]}</div>}
                                            {!props.resultats_finaux && 
                                            <div className="col text-center"><b>{player["tables_played"][round["round_number"] - 1] === 0 ? "" : player["tables_played"][round["round_number"] - 1]}</b>
                                                {props.tables_names[player["tables_played"][round["round_number"] - 1] - 1] && (
                                                    <div>
                                                        
                                                        {player["tables_played"][round["round_number"] - 1] !== 0 && props.tables_names[player["tables_played"][round["round_number"] - 1] - 1]}
                                                    </div>
                                                )}
                                            </div>}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            )}
        </div>
    )
}
