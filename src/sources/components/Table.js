import React, { useEffect } from 'react';

import Player from './Player.js';
import Commentaire from './Commentaire.js'

export default function Table(props) {
    //console.log("Trying to create the table "+ props.table_number +" for round "+ props.round_number);
    //console.log("Round data : " + JSON.stringify(props.result));

    const players_affinity = [
        [
            "Manadar", "decalogus"
        ],
        [
            "Fleau_le_Preux", "Le_Preux_Shawn"
        ],
        [
            "Thelion_AOE", "Raphdu78", "Alexdu78"
        ],
        [
            "Captnnarsice", "Captnfrene", "Hugzzzy"
        ],
        [
            "HeStan", "tordek_urside", "Le-Voyageur"
        ],
        [
            "Frere_derebor1", "FRERES-D-EREBOR"
        ]
    ]

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

    const are_same_affinity = (player1_name, player2_name) => {
        for(let i = 0; i < players_affinity.length; i++) {
            if(players_affinity[i].includes(player1_name) && players_affinity[i].includes(player2_name)) {
                return true;
            }
        }

        return false;
    }

    let [player1_score, setPlayer1Score] = React.useState(props.result["player1_score"]);
    let [player2_score, setPlayer2Score] = React.useState(props.result["player2_score"]);
    let [nb_tours, setNbTours] = React.useState(props.result["nb_tours"]);
    let [editable, setEditable] = React.useState(false);

    let [displayAppariement1, setDisplayAppariement1] = React.useState(false);
    let [displayAppariement2, setDisplayAppariement2] = React.useState(false);
    let [displayAppariementTable, setDisplayAppariementTable] = React.useState(false);

    let [selectPlayer1, setSelectPlayer1] = React.useState(props.result["player1"]);
    let [selectPlayer2, setSelectPlayer2] = React.useState(props.result["player2"]);
    let [selectTable, setSelectTable] = React.useState(props.result["table"]);

    console.log(props.result)

    React.useEffect(() => {
        setSelectPlayer1(props.result["player1"]);
        setSelectPlayer2(props.result["player2"]);
        setSelectTable(props.result["table"]);
    }, [props.result])

    const handleScoreChange = (event) => {
        event.preventDefault();
        //console.log("Score change : " + event.target.value);
        if(event.target.id == `score_R${props.result["round_number"]}T${props.result["table_number"]}_${props.result["player1"]}`) {
            setPlayer1Score(event.target.value);
        } else if(event.target.id == `score_R${props.result["round_number"]}T${props.result["table_number"]}_${props.result["player2"]}`) {
            setPlayer2Score(event.target.value);
        }
    }

    const handleEditTable = (event) => {
        const btnpressed = event.currentTarget.getAttribute("btnpressed");
        if(btnpressed == "player1") {
            setDisplayAppariement1((current) => !current);
        } else if(btnpressed == "player2") {
            setDisplayAppariement2((current) => !current);
        } else {
            setDisplayAppariementTable((current) => !current);
        }
        //alert("Not implemented yet !");
    }

    const handleEdit = function (event) {
        setEditable((editable) => !editable)
    }

    const handlePlayer1Change = function(event) {
        setSelectPlayer1(event.target.value);
    }

    const handlePlayer2Change = function(event) {
        setSelectPlayer2(event.target.value);
    }

    const handleNbToursCHanged = function(event) {
        setNbTours(event.target.value);
    }

    const handleTableChange = function(event) {
        setSelectTable(event.target.value);
    }

    const handleEditOk = function(event) {
        props.handleEditAppariement(event);
        setDisplayAppariement1(false);
        setDisplayAppariement2(false);
        setDisplayAppariementTable(false);
    }

    const handleSaveScore = function(event) {
        //alert("Trying to save the score ("+ player1_score +" - "+ player2_score +")");
        let parsed1 = parseInt(player1_score);
        let parsed2 = parseInt(player2_score);
        let parsed_tours = parseInt(nb_tours);
        if(isNaN(parsed1) || isNaN(parsed2) || parsed1 > 12 || parsed1 < 0 || parsed2 > 12 || parsed2 < 0 || parsed1.toString() !== player1_score || parsed2.toString() !== player2_score) {
            alert("Impossible d'enregistrer le score ("+ player1_score +" - "+ player2_score +"). Ce ne sont pas des entiers compris entre 0 et 12");
            event.preventDefault();
            return false;
        }

        if(isNaN(parsed_tours) || parsed_tours < 0 || parsed_tours > 100) {
            alert(nb_tours + " n'est pas un nombre de tours valides (entier compris entre 0 et 100)");
            event.preventDefault();
            return false;
        }

        props.saveScore(event);
        return true;
    }

    let player1 = props.players.filter((player) => player["name"] == props.result["player1"])[0];
    let player2 = props.players.filter((player) => player["name"] == props.result["player2"])[0];
    let tables = Array.from({length: props.players.length/2}, (_, i) => i + 1);
    let score_difference = player1["results_with_goalaverage"][props.result["round_number"] - 2] - player2["results_with_goalaverage"][props.result["round_number"] - 2]
    let same_affinity = are_same_affinity(player1["name"], player2["name"]);

    /*console.log("Table "+ props.result["table"]);
    console.log(`Tables played by ${player1["name"]} :`);
    console.log(player1["tables_played"]);
    console.log(`Tables played by ${player2["name"]} :`);
    console.log(player2["tables_played"]);

    console.log("Player 1 :")
    console.log(player1);
    console.log("Player 2 : ")
    console.log(player2);*/

    console.log("Score difference :")
    console.log(score_difference);

    if(props.result === undefined) {
        return;
    } else {
        return (
            <div className='my-2'>
                <div className='row my-2 text-center'>
                    <div className="col">Table {props.result["table"]}{props.tables_names[props.result["table"] - 1] && (" - "+ props.tables_names[props.result["table"] - 1])} <br />({props.result["state"]})</div>
                    <Player player={player1} round_number={props.result["round_number"]} detailedView={props.detailedView}/>
                    <Player player={player2} round_number={props.result["round_number"]} detailedView={props.detailedView}/>
                </div>
                {props.result["state"] == "Création en cours" &&
                <div className='row text-center mb-5'>
                    {player1["opponents_played"].includes(player2["name"]) && (
                        <Commentaire value={`${player1["name"]} a déjà joué contre ${player2["name"]}`} />
                    )}
                    {player1["tables_played"].includes(selectTable) && (
                        <Commentaire value={`${player1["name"]} a déjà joué sur la table ${selectTable}`} />
                    )}
                    {player2["tables_played"].includes(selectTable) && (
                        <Commentaire value={`${player2["name"]} a déjà joué sur la table ${selectTable}`} />
                    )}
                    {(score_difference > 3 || score_difference < -3) && (
                        <Commentaire value={`L'écart de score entre ${player1["name"]} et ${player2["name"]} est de ${score_difference.toFixed(2)} points`} />
                    )}
                    {same_affinity && (
                        <Commentaire value={`Les joueurs ${player1["name"]} et ${player2["name"]} jouent souvent ensemble.`} />
                    )}
{displayAppariementTable ?
                    <div className='col'>
                        <select className="form-select" id={`T${props.result["table"]}T`} name={`T${props.result["table"]}T`} value={selectTable} onChange={handleTableChange}>
                            <option value={selectTable}>{"Table " + selectTable + (props.tables_names[selectTable - 1] ? (" - " + props.tables_names[selectTable - 1]) : "")}</option>
                            {tables.map((table) => {
                                if(table == props.result["table"]) {
                                    return ;
                                } else {
                                    let [other_player1, other_player2, other_table] = props.get_other_result(table, undefined);
                                    console.log("Table :");
                                    console.log(table);
                                    console.log(other_player1)
                                    console.log(other_player2)
                                    if(player1["tables_played"].includes(table)) {
                                        return <option value={table} key={table}>Table {table} - {props.tables_names[table - 1] && (" - " + props.tables_names[table - 1] + " - ")} Déjà occupée par {player1["name"]}</option>
                                    } else if(player2["tables_played"].includes(table)) {
                                        return <option value={table} key={table}>Table {table} - {props.tables_names[table - 1] && (" - " + props.tables_names[table - 1] + " - ")} Déjà occupée par {player2["name"]}</option>
                                    } else if(other_player1["tables_played"].includes(props.result["table"])) {
                                        return <option value={table} key={table}>Table {table} - {props.tables_names[table - 1] && (" - " + props.tables_names[table - 1] + " - ")} {other_player1["name"]} a déjà joué sur la table {props.result["table"]}</option>
                                    } else if(other_player2["tables_played"].includes(props.result["table"])) {
                                        return <option value={table} key={table}>Table {table} - {props.tables_names[table - 1] && (" - " + props.tables_names[table - 1] + " - ")} {other_player2["name"]} a déjà joué sur la table {props.result["table"]}</option>
                                    } else {
                                        return <option value={table} key={table}>Table {table} {props.tables_names[table - 1] && (" - " + props.tables_names[table - 1])}</option>
                                    }
                                }
                            })}
                        </select>
                        <button className='btn btn-success mx-2' edit_type='table' previous_value={props.result["table"]} new_value={selectTable} onClick={handleEditOk}>OK</button>
                        <button className='btn btn-danger mx-2' btnpressed="table" onClick={handleEditTable}>Annuler</button>
                    </div> :
                    <div className='col'><button className="btn btn-outline-success" btnpressed="table" onClick={handleEditTable}>Modifier</button></div>}

{displayAppariement1 ?
                    <div className='col'>
                        <select className="form-select" id={`T${props.result["table"]}P1`} name={`T${props.result["table"]}P1`} value={selectPlayer1} onChange={handlePlayer1Change}>
                            <option value={player1["name"]}>{player1["name"]}</option>
                            {props.players.map((player) => {
                                if(player["name"] == player1["name"] || player["name"] == player2["name"]) {
                                    return ;
                                } else {
                                    let [other_player1, other_player2, other_table] = props.get_other_result(undefined, player["name"]);
                                    if(other_player2["name"] == player["name"]) {
                                        other_player2 = other_player1;
                                        other_player1 = player;
                                    }
                                    
                                    if(player2["opponents_played"].includes(other_player1["name"])) {
                                        return <option value={other_player1["name"]} key={other_player1["name"]}>{other_player1["name"]} - {player2["name"]} a déjà joué contre {other_player1["name"]}</option>
                                    } else if(player1["opponents_played"].includes(other_player2["name"])) {
                                        return <option value={other_player1["name"]} key={other_player1["name"]}>{other_player1["name"]} - {player1["name"]} a déjà joué contre {other_player2["name"]}</option>
                                    } else if(other_player1["tables_played"].includes(props.result["table"])) {
                                        return <option value={other_player1["name"]} key={other_player1["name"]}>{other_player1["name"]} - {other_player1["name"]} a déjà joué sur la table {props.result["table"]}{props.tables_names[props.result["table"] - 1] && (" - " + props.tables_names[props.result["table"] - 1])}</option>
                                    } else if(player1["tables_played"].includes(other_table)) {
                                        return <option value={other_player1["name"]} key={other_player1["name"]}>{other_player1["name"]} - {player1["name"]} a déjà joué sur la table {other_table}{props.tables_names[other_table - 1] && (" - " + props.tables_names[other_table - 1])}</option>
                                    } else if(are_same_affinity(other_player1["name"], player2["name"])) {
                                        return <option value={other_player1["name"]} key={other_player1["name"]}>{other_player1["name"]} - {player2["name"]} et {other_player1["name"]} jouent souvent ensemble</option>
                                    } else if(are_same_affinity(other_player2["name"], player1["name"])) {
                                        return <option value={other_player1["name"]} key={other_player1["name"]}>{other_player1["name"]} - {player1["name"]} et {other_player2["name"]} jouent souvent ensemble</option>
                                    } else {
                                        return <option value={player["name"]} key={player["name"]}>{player["name"]}</option>
                                    }
                                }
                            })}
                        </select>
                        <button className='btn btn-success mx-2' edit_type='player1' previous_value={props.result["player1"]} new_value={selectPlayer1} onClick={handleEditOk}>OK</button>
                        <button className='btn btn-danger mx-2' btnpressed="player1" onClick={handleEditTable}>Annuler</button>
                    </div> :
                    <div className='col'><button className="btn btn-outline-success" btnpressed="player1" onClick={handleEditTable}>Modifier</button></div>}

{displayAppariement2 ?
                    <div className='col'>
                        <select className="form-select" id={`T${props.result["table"]}P2`} name={`T${props.result["table"]}P2`} value={selectPlayer2} onChange={handlePlayer2Change}>
                            <option value={player2["name"]}>{player2["name"]}</option>
                            {props.players.map((player) => {
                                if(player["name"] == player1["name"] || player["name"] == player2["name"]) {
                                    return ;
                                } else {
                                    let [other_player1, other_player2, other_table] = props.get_other_result(undefined, player["name"]);
                                    if(other_player1["name"] == player["name"]) {
                                        other_player1 = other_player2;
                                        other_player2 = player;
                                    }
                                    
                                    if(player2["opponents_played"].includes(other_player1["name"])) {
                                        return <option value={other_player2["name"]} key={other_player2["name"]}>{other_player2["name"]} - {player2["name"]} a déjà joué contre {other_player1["name"]}</option>
                                    } else if(player1["opponents_played"].includes(other_player2["name"])) {
                                        return <option value={other_player2["name"]} key={other_player2["name"]}>{other_player2["name"]} - {player1["name"]} a déjà joué contre {other_player2["name"]}</option>
                                    } else if(other_player2["tables_played"].includes(props.result["table"])) {
                                        return <option value={other_player2["name"]} key={other_player2["name"]}>{other_player2["name"]} - {other_player2["name"]} a déjà joué sur la table {props.result["table"]}{props.tables_names[props.result["table"] - 1] && (" - " + props.tables_names[props.result["table"] - 1])}</option>
                                    } else if(player2["tables_played"].includes(other_table)) {
                                        return <option value={other_player2["name"]} key={other_player2["name"]}>{other_player2["name"]} - {player2["name"]} a déjà joué sur la table {other_table}{props.tables_names[other_table - 1] && (" - " + props.tables_names[other_table - 1])}</option>
                                    } else if(are_same_affinity(other_player1["name"], player2["name"])) {
                                        return <option value={other_player2["name"]} key={other_player2["name"]}>{other_player2["name"]} - {player2["name"]} et {other_player1["name"]} jouent souvent ensemble</option>
                                    } else if(are_same_affinity(other_player2["name"], player1["name"])) {
                                        return <option value={other_player2["name"]} key={other_player2["name"]}>{other_player2["name"]} - {player1["name"]} et {other_player2["name"]} jouent souvent ensemble</option>
                                    } else {
                                        return <option value={player["name"]} key={player["name"]}>{player["name"]}</option>
                                    }
                                }
                            })}
                        </select>
                        <button className='btn btn-success mx-2' edit_type='player2' previous_value={props.result["player2"]} new_value={selectPlayer2} onClick={handleEditOk}>OK</button>
                        <button className='btn btn-danger mx-2' btnpressed="player2" onClick={handleEditTable}>Annuler</button>
                    </div> :
                    <div className='col'><button className="btn btn-outline-success" btnpressed="player2" onClick={handleEditTable}>Modifier</button></div>}
                </div>}
                {(props.result["state"] == "En cours" || props.result["state"] == "Terminé") &&
                    <form>
                        <div className='row'>
                            <div className="col">Résultats</div>
                            <div className='col'>
                                {props.result["state"] == "En cours" || editable ?
                                    <input type="text" className="form-control"
                                        id={`score_R${props.result["round_number"]}T${props.result["table_number"]}_${props.result["player1"]}`}
                                        name={`score_R${props.result["round_number"]}T${props.result["table_number"]}_${props.result["player1"]}`}
                                        value={player1_score}
                                        placeholder={`Score de ${props.result["player1"]}`} onChange={handleScoreChange} />
                                :
                                    <p className='text-center'>{player1_score}</p>    
                                }
                            </div>
                            <div className='col'>
                                {props.result["state"] == "En cours" || editable ?
                                    <input type="text" className="form-control"
                                        id={`score_R${props.result["round_number"]}T${props.result["table_number"]}_${props.result["player2"]}`}
                                        name={`score_R${props.result["round_number"]}T${props.result["table_number"]}_${props.result["player2"]}`}
                                        value={player2_score}
                                        placeholder={`Score de ${props.result["player2"]}`} onChange={handleScoreChange} />
                                :
                                    <p className='text-center'>{player2_score}</p>    
                                }
                            </div>
                        </div>
                        <div className='row mt-2 mb-5 text-center'>
                            <div className='col-6'></div>
                            <div className='col-2'>
                                {props.result["state"] == "En cours" || editable ?
                                    <input type="text" className="form-control"
                                        id={`nbTours_R${props.result["round_number"]}T${props.result["table_number"]}`}
                                        name={`nbTours_R${props.result["round_number"]}T${props.result["table_number"]}`}
                                        value={nb_tours}
                                        placeholder={`Nombre de tours joués`} onChange={handleNbToursCHanged} />
                                :
                                    <p className='text-center'>{`${nb_tours} ${nb_tours > 1 ? 'tours joués' : 'tour joué'} ${props.result['duration'] !== undefined ? ('en ' + HHmmss_time(props.result['duration'], 'spoken')) : ''}`}</p>
                                }
                            </div>
                        </div>

                        {(player1_score != "" && player2_score != "" && nb_tours != "" && props.result["state"] == "En cours") &&
                            <div className='text-end my-3'>
                                <button className='btn btn-success' player1_score={player1_score} player2_score={player2_score} nb_tours={nb_tours} table={props.result["table"]}
                                        round={props.result["round_number"]} onClick={handleSaveScore}>Enregistrer
                                </button>
                            </div>}

                        {props.result["commentaires"].map((commentaire, i) => {
                            return <Commentaire value={commentaire} key={i} />
                        })}
                    </form>
                }
                {(props.result["state"] == "Terminé") && (
                    <div className='text-end my-3'>
                        {editable ?
                            <div>
                                <button className='btn btn-danger' onClick={handleEdit}>Annuler</button>
                                <button className="btn btn-success mx-5" onClick={(e) => {if(handleSaveScore(e)){ props.handleEditRound(e); setEditable(false)}}} player1_score={player1_score} player2_score={player2_score} nb_tours={nb_tours} table={props.result["table"]}
                                round={props.result["round_number"]}>Enregistrer</button>
                            </div>
                         :
                            <button className='btn btn-success' onClick={handleEdit}>Editer</button>
                        }
                    </div>
                )}
            </div>
        );
    }
}