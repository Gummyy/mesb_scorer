import React from 'react';

import InscriptionsPlayer from './InscriptionsPlayer';
import InscriptionsTable from './InscriptionsTable';
import InscriptionsTeams from './InscriptionsTeams';
import InscriptionsNewTeamPlayer from './InscriptionsNewTeamPlayer';

export default function TournamentInscriptions(props) {
    /*let [players_data, setPlayersData] = React.useState(props.players_data);
    let [results_data, setResultsData] = React.useState(props.results);
    let [tables_names, setTablesNames] = React.useState(props.tables_names);*/
    let [players_data, setPlayersData] = [props.players_data, props.setPlayersData];
    let [results_data, setResultsData] = [props.results, props.setResults];
    let [tables_names, setTablesNames] = [props.tables_names, props.setTablesNames];
    let [teams, setTeams] = [props.teams, props.setTeams];
    let rounds = props.rounds;

    let [view, setView] = React.useState("players");

    let [new_team_displayed, setNewTeamDisplayed] = React.useState(false);
    let [new_team_players, setNewTeamPlayers] = React.useState(players_data.map((player) => false));

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

        if(view === "teams") {
            if(teams.reduce((accumulator, team) => [...accumulator, ...team["opponents_played"]], []).length > 0) {
                alert("Impossible de reset les équipes. Des appariements ont déjà eu lieu.");
                return;
            }

            setTeams([]);
        } else {

            if(results_data !== undefined && results_data.length > 0) {
                alert("Impossible de réinitialiser la liste des joueurs, le tournoi a déjà commencé.");
                return;
            }

            setPlayersData([]);
            setTablesNames([]);
            setNewTeamDisplayed(false);
        }
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

    const handleViewTeams = (event) => {
        event.preventDefault();
        setView("teams");
    }

    // Team stuff

    const playerChangeTeam = (event) => {
        event.preventDefault();
        const cur_player = event.currentTarget.getAttribute("player");
        const cur_new_team = event.currentTarget.getAttribute("newteam");

        setPlayersData((players) => {
            return players.map((player) => {
                if(player["name"] === cur_player) {
                    player["team"] = cur_new_team;
                }
                return player;
            })
        })
    }

    const handleAddTeam = (event) => {
        event.preventDefault();

        if(new_team_displayed) {
            alert("Une équipe est déjà en cours de création. Vous devez valider ses joueurs avant d'en créer d'autres.")
            return false;
        }

        let i = 1;
        let current_team_names = teams.reduce((accumulator, team) => [...accumulator, team["name"]], []);
        while(current_team_names.includes(`Nouvelle équipe ${i}`)) {
            i++;
        }
        setTeams((teams) => [...teams, {
            "name": `Nouvelle équipe ${i}`,
            "opponents_played": [],
            "results": [],
            "results_with_goalaverage": []
        }]);

        setNewTeamDisplayed(true);
        setNewTeamPlayers(players_data.map((player) => false));
    }

    const editTeam = (event) => {
        event.preventDefault();

        const cur_index = parseInt(event.currentTarget.getAttribute("index"));
        const cur_new_team_name = event.currentTarget.getAttribute("newname");
        const cur_old_team_name = event.currentTarget.getAttribute("oldname");

        if(teams.reduce((accumulator, team) => [...accumulator, team["name"]], []).includes(cur_new_team_name)) {
            alert(`Impossible d'attribuer ce nom. Une équipe s'appelle déjà ${cur_new_team_name}`);
            return false;
        }

        //console.log(`Trying to change ${cur_old_team_name} (${cur_index}) to ${cur_new_team_name}`)

        setTeams((teams) => {
            return teams.map((team, index) => {
                //console.log("Before :")
                //console.log(team)
                if(cur_index === index) {
                    team["name"] = cur_new_team_name;
                }
                //console.log("After :")
                //console.log(team)
                return {...team,
                    "opponents_played": team["opponents_played"].map((team_name) => team_name === cur_old_team_name ? cur_new_team_name : team_name)
                };
            });
        });

        setPlayersData((players) => {
            return players.map((player) => {
                if(player["team"] === cur_old_team_name) {
                    player["team"] = cur_new_team_name;
                }
                return player;
            });
        });

        return true;
    }

    const deleteTeam = (event) => {
        event.preventDefault();

        const cur_team_name = event.currentTarget.getAttribute("team");
        const cur_index = parseInt(event.currentTarget.getAttribute("index"));

        if(teams.reduce((accumulator, team) => [...accumulator, ...team["opponents_played"]], []).includes(cur_team_name)) {
            alert("Impossible de supprimer une équipe qui a déjà été appareillée");
            return;
        }

        console.log(`Trying to delete team ${cur_team_name} (${cur_index})`);

        setTeams((teams) => {
            return teams.filter((team, index) => team["name"] !== cur_team_name || index !== cur_index);
        });
        setPlayersData((players) => {
            return players.map((player) => {
                if(player["team"] === cur_team_name) {
                    player["team"] = "";
                }
                return player;
            });
        });
        if(cur_index === teams.length - 1)
            setNewTeamDisplayed(false);
    }

    const handleCheckedChange = (event) => {
        const cur_index = parseInt(event.currentTarget.getAttribute("index"));

        setNewTeamPlayers((new_team_players) => {
            return new_team_players.map((is_checked, index) => {
                if(index !== cur_index) {
                    return is_checked;
                } else {
                    return event.target.checked;
                }
            })
        })
    }

    const handleValidateNewTeam = (event) => {
        event.preventDefault();
        console.log(`Trying to validate new team ${teams[teams.length - 1]["name"]}`)
        console.log(new_team_players);
        setPlayersData((players) => {
            return players.map((player, index) => {
                if(new_team_players[index]) {
                    player["team"] = teams[teams.length - 1]["name"];
                    console.log(`Player ${player["name"]} added to team ${teams[teams.length - 1]["name"]}`);
                }
                return player;
            })
        })
        setNewTeamDisplayed(false);
    }

    const handleAbortNewTeam = (event) => {
        event.preventDefault();
        setNewTeamDisplayed(false);
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
                <div className='col text-center mb-3'>
                    <button type="button" className='btn btn-outline-primary mx-2' onClick={handleViewPlayers}>Joueurs</button>
                    <button type="button" className='btn btn-outline-primary mx-2' onClick={handleViewTables}>Tables</button>
                    <button type="button" className='btn btn-outline-primary mx-2' onClick={handleViewTeams}>Equipes</button>
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
                {view == "teams" && 
                <div>
                    {teams.length === 0 &&
                        <p>Aucune équipe pour le moment</p>
                    }
                    {teams.map((team, index) => {
                        return (
                            <InscriptionsTeams key={index} team={team} index={index} editTeam={editTeam} deleteTeam={deleteTeam} players_data={players_data} playerChangeTeam={playerChangeTeam} teams={teams} />
                        )
                    })}
                    {new_team_displayed &&
                    <div>
                        {
                            players_data.map((player, index) => {
                                if(player["name"].trim() !== "" && (player["team"] === undefined || player["team"] === "")) {
                                    return (
                                        <InscriptionsNewTeamPlayer player={player} index={index} key={index} handleCheckedChange={handleCheckedChange} is_checked={new_team_players[index]} />
                                    )
                                }
                            })
                        }
                        <div className='row'>
                            <div className='col text-end'>
                                {new_team_players.reduce((accumulator, current) => accumulator || current, false) &&
                                    <button title="Valider" type="button" className='btn btn-success mt-5 mx-3' onClick={handleValidateNewTeam}>OK</button>
                                }
                                <button className='btn btn-danger mx-3 mt-5' btnpressed="table" onClick={handleAbortNewTeam}>Annuler</button>
                            </div>
                        </div>
                    </div>}
                    <div className='row'>
                        <div className='col text-end'>
                            <button title="Ajouter une équipe" type="button" className='btn btn-outline-primary mt-5 mx-3' onClick={handleAddTeam}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                            </button>
                        </div>
                    </div>
                </div>
                }
                <div className='row'>
                    <div className='col text-end'>
                        <button type="button" className='btn btn-warning mt-5 mx-3' onClick={handleReset}>Reset</button>
                    </div>
                </div>
        </div>
    );
}