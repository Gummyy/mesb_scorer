import React from 'react';

import InscriptionsPlayer from './InscriptionsPlayer';
import InscriptionsTable from './InscriptionsTable';

export default function TournamentInscriptions(props) {
    /*let [players_data, setPlayersData] = React.useState(props.players_data);
    let [results_data, setResultsData] = React.useState(props.results);
    let [tables_names, setTablesNames] = React.useState(props.tables_names);*/
    let [players_data, setPlayersData] = [props.players_data, props.setPlayersData];
    let [results_data, setResultsData] = [props.results, props.setResults];
    let [tables_names, setTablesNames] = [props.tables_names, props.setTablesNames];
    let rounds = props.rounds;

    let [view, setView] = React.useState("players")

    const handleAddPlayer = (event) => {
        event.preventDefault();

        if(rounds.filter((round) => round["state"] == "En cours").length > 0) {
            alert("Impossible d'ajouter un joueur tant que des rounds sont en cours.")
            return;
        }

        if(players_data.length %2 == 0) {
            setTablesNames((tables_names) => [...tables_names, ""]);
        }

        setPlayersData((players_data) => {
            const empty_array = players_data.length > 0 ? players_data[0]["points"].map((_) => 0) : [];

            return [...players_data, {
                "name": "",
                "full_name": "",
                "armee": "",
                "points": empty_array,
                "goalaverages": empty_array,
                "results_with_goalaverage": empty_array,
                "tables_played": empty_array,
                "opponents_played": empty_array
            }]
        })
    }

    const handleAddTable = (event) => {
        event.preventDefault();

        if(rounds.filter((round) => round["state"] == "En cours").length > 0) {
            alert("Impossible d'ajouter une table tant que des rounds sont en cours.")
            return;
        }

        const empty_array = players_data.length > 0 ? players_data[0]["points"].map((_) => 0) : [];
        setTablesNames((tables_names) => [...tables_names, ""]);
        setPlayersData((players_data) => {
            return [...players_data, ...[{
                "name": "",
                "full_name": "",
                "armee": "",
                "points": empty_array,
                "goalaverages": empty_array,
                "results_with_goalaverage": empty_array,
                "tables_played": empty_array,
                "opponents_played": empty_array
            },
            {
                "name": "",
                "full_name": "",
                "armee": "",
                "points": empty_array,
                "goalaverages": empty_array,
                "results_with_goalaverage": empty_array,
                "tables_played": empty_array,
                "opponents_played": empty_array
            }
        ]]
        })
    }

    const handleReset = (event) => {
        event.preventDefault();

        if(results_data !== undefined && results_data.length > 0) {
            alert("Impossible de réinitialiser la liste des joueurs, le tournoi a déjà commencé.");
            return;
        }

        setPlayersData([]);
        setTablesNames([]);
    }
    
    const handleStartTournament = (event) => {
        event.preventDefault();
        console.log("Trying to start the tournament with these players :")
        console.log(players_data);

        for(let i = 0; i < players_data.length; i++) {
            if(players_data[i]["name"] == "") {
                alert("Un joueur avec un pseudonyme vide est impossible");
                return;
            }
        }

        if(players_data.length %2 == 1) {  // We add a dead player
            alert("Le nombre de joueurs est impair. Un joueur mort a automatiquement été ajouté");
            const empty_array = players_data.length > 0 ? players_data[0]["points"].map((_) => 0) : [];
            let cur_try = " ";
            let elements = players_data.filter((player) => player["name"] == cur_try);
            while (elements.length > 0) {
                cur_try += " ";
                elements = players_data.filter((player) => player["name"] == cur_try);
            }
            
            setPlayersData((players_data) => {
                return [...players_data, {
                    "name": cur_try,
                    "full_name": "",
                    "armee": "",
                    "points": empty_array,
                    "goalaverages": empty_array,
                    "results_with_goalaverage": empty_array,
                    "tables_played": empty_array,
                    "opponents_played": empty_array
                }]
            })
        }
        props.switchToTournaments();
    }

    const editPlayer = (event) => {
        event.preventDefault();

        const cur_name = event.currentTarget.getAttribute("name");
        const cur_full_name = event.currentTarget.getAttribute("full_name");
        const cur_armee = event.currentTarget.getAttribute("armee");
        const cur_index = event.currentTarget.getAttribute("index");

        const cur_new_name = event.currentTarget.getAttribute("new_name");
        const cur_new_full_name = event.currentTarget.getAttribute("new_full_name");
        const cur_new_armee = event.currentTarget.getAttribute("new_armee");

        console.log("Trying to edit :");
        console.log(`${cur_full_name} (${cur_name}) qui joue ${cur_armee}\t\t=>\t\t${cur_new_full_name} (${cur_new_name}) qui joue ${cur_new_armee} à l'index ${cur_index}`);

        if(players_data.filter((player, index) => player["name"] == cur_new_name && index != cur_index).length > 0) {
            alert("Un joueur possédant déjà ce pseudo existe. Pour échanger des pseudos, il est nécessaire de mettre un pseudo temporaire à l'un des deux joueurs dans un premier temps")
            return;
        }

        setPlayersData((players_data) => {
            return players_data.map((player, index) => {
                if(player["name"] != cur_name || player["full_name"] != cur_full_name || player["armee"] != cur_armee || index != cur_index ) {
                    return {...player, "opponents_played": player["opponents_played"].map((opponent) => {
                        if(opponent === cur_name) {
                            console.log("Updating opponents played for");
                            console.log(player);
                            console.log("he played against "+ opponent + " which is equal to "+ cur_name +" and it is being replaced by "+ cur_new_name);
                            return cur_new_name;
                        } else {
                            return opponent;
                        }
                    })}
                } else {
                    player["name"] = cur_new_name;
                    player["full_name"] = cur_new_full_name;
                    player["armee"] = cur_new_armee;

                    return player;
                }
            })
        });

        setResultsData((results) => {
            return results.map((result) => {
                return {...result,  "player1": result["player1"] == cur_name ? cur_new_name : result["player1"],
                                    "player2": result["player2"] == cur_name ? cur_new_name : result["player2"]};
            });
        });
    }

    const deletePlayer = (event) => {
        event.preventDefault();

        const cur_name = event.currentTarget.getAttribute("name");
        const cur_full_name = event.currentTarget.getAttribute("full_name");
        const cur_armee = event.currentTarget.getAttribute("armee");
        const cur_index = event.currentTarget.getAttribute("index");

        if(results_data !== undefined && results_data.filter((result) => result["player1"] == cur_name || result["player2"] == cur_name).length > 0) {
            alert("Supprimer un joueur qui a déjà été appareillé pour une partie ou obtenu des résultats fera crasher l'application. Opération impossible");
            return;
        }

        console.log("Trying to delete :");
        console.log(`${cur_full_name} (${cur_name}) qui joue ${cur_armee}`);

        if(players_data.length %2 == 1) {
            setTablesNames((tables_names) => {
                let ans = tables_names;
                ans.pop();
                return ans;
            });
        }
        
        setPlayersData((players_data) => {
            return players_data.filter((player, index) => {
                return player["name"] != cur_name || player["full_name"] != cur_full_name || player["armee"] != cur_armee || index != cur_index;
            });
        });
    }

    const editTable = (event) => {
        event.preventDefault();

        const table_index = event.currentTarget.getAttribute("index");
        const new_table_name = event.currentTarget.getAttribute("name");

        console.log(`Trying to edit table ${table_index + 1} :\t${tables_names[table_index]} => ${new_table_name}`);

        setTablesNames((tables_names) => {
            return tables_names.map((table, i) => {
                if(table_index == i) {
                    return new_table_name;
                } else {
                    return table;
                }
            })
        })
    }

    const handleViewPlayers = (event) => {
        event.preventDefault();
        setView("players");
    }

    const handleViewTables = (event) => {
        event.preventDefault();
        setView("tables");
    }

    return (
        <div className='container'>
            <h1 className='text-center'>MESBG Scorer - Inscriptions</h1>
            <div className='row'>
                <div className='col text-center'>
                    <button type="button" className='btn btn-secondary my-2' onClick={handleStartTournament}>Tournoi</button>
                </div>
            </div>

            <div className='row'>
                <div className='col text-center'>
                    <button type="button" className='btn btn-outline-primary mx-2' onClick={handleViewPlayers}>Joueurs</button>
                    <button type="button" className='btn btn-outline-primary mx-2' onClick={handleViewTables}>Tables</button>
                </div>
            </div>
                {view == "players" && 
                <div>
                    {players_data.map((player, index) => {
                        return <InscriptionsPlayer index={index} player={player} key={index} editPlayer={editPlayer} deletePlayer={deletePlayer} />
                    })}
                    <div className='row'>
                        <div className='col text-end'>
                            <button title="Ajouter un joueur" type="button" className='btn btn-outline-primary mt-5 mx-3' onClick={handleAddPlayer}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                            </button>
                        </div>
                    </div>
                </div>}

                {view == "tables" &&
                <div>
                    {tables_names.map((name, index) => {
                        return <InscriptionsTable key={index} name={name} index={index} editTable={editTable} />
                    })}
                    <div className='row'>
                        <div className='col text-end'>
                            <button title="Ajouter une table" type="button" className='btn btn-outline-primary mt-5 mx-3' onClick={handleAddTable}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                            </button>
                        </div>
                    </div>
                </div>}
                <div className='row'>
                    <div className='col text-end'>
                        <button type="button" className='btn btn-warning mt-5 mx-3' onClick={handleReset}>Reset</button>
                    </div>
                </div>
        </div>
    );
}