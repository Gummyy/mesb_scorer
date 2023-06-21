import React from 'react';

import InscriptionsTeamsPlayer from './InscriptionsTeamsPlayer'

// A default nav bar component
export default function InscriptionsTeams(props) {
    /*team = {
        "name": "",
        "opponents_played": [],
        "results": [],
        "results_with_goalaverage": []
    }*/

    let [players, setPlayers] = [props.players_data, props.setPlayersData];
    let [teams, setTeams] = [props.teams_data, props.setTeamsData];
    let [results, setResults] = [props.results_data, props.setResultsData];
    

    const handleNameChange = (event) => {
        event.preventDefault();
        setNewTableName(event.target.value)
        setEdited(event.target.value != start_name);
    }

    const changeTeam = (event) => {
        event.preventDefault();
        const cur_player = event.currentTarget.getAttribute("player");
        const cur_new_team = event.currentTarget.getAttribute("newteam");

        setPlayers((players) => {
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

    }

    const handleEditTeam = (event) => {
        event.preventDefault();

        const cur_old_team_name = event.currentTarget.getAttribute("oldvalue");
        const cur_new_team_name = event.currentTarget.getAttribute("newvalue");
    }

    const handleDeleteTeam = (event) => {
        event.preventDefault();

        const cur_team_name = event.currentTarget.getAttribute("team");
    }

    const handleResetTeams = (event) => {
        event.preventDefault();


    }

    return (
        <div className='container'>
            {
                props.teams.map((team, index) => {
                    return (
                        <div className='row' key={index}>
                            <div className='col'>
                                <h3>{team["name"]}</h3>
                                {
                                    props.players.filter((player) => player["team"] !== undefined && player["team"] === team["name"]).map((player, index2) => {
                                        return (
                                            <InscriptionsTeamsPlayer teams={props.teams} player={player} changeTeam={changeTeam} key={index2} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
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
            <div className='row'>
                <div className='col text-end'>
                    <button type="button" className='btn btn-warning mt-5 mx-3' onClick={handleResetTeams}>Reset</button>
                </div>
            </div>
        </div>
    )
}