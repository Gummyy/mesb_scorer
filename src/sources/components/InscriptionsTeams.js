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

    let [editableTeam, setEditableTeam] = React.useState(false);
    let [new_team_name, setNewTeamName] = React.useState(props.team["name"]);
    let [hasChanged, setHasChanged] = React.useState(false);

    React.useEffect(() => {
        setNewTeamName(props.team["name"])
    }, [props.team["name"]]);

    const handleSetEditableTeam = (event) => {
        event.preventDefault();

        setEditableTeam((editableTeam) => !editableTeam);
    };

    const handleNameChange = (event) => {
        event.preventDefault();

        setHasChanged(event.target.value !== props.team["name"]);
        setNewTeamName((event.target.value));
    }

    return (
        <div className='my-3'>
            <div className='row' key={props.index}>
                <div className='col-4'>
                    {editableTeam ?
                        <input type="text" className="form-control" id={`Team${props.index}`} name={`Team${props.index}`} value={new_team_name} onChange={handleNameChange} /> :
                        <h3>{props.team["name"]}</h3>}
                </div>
                <div className='col-4'>
                    {hasChanged && editableTeam &&
                        <button type="button" title="Valider" className='btn btn-success mx-3' onClick={(event) => {if(props.editTeam(event)){ setEditableTeam(false); }}} index={props.index} newname={new_team_name} oldname={props.team["name"]}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                        </svg>
                        </button>}
                    {editableTeam ?
                        <button className='btn btn-danger mx-2' onClick={handleSetEditableTeam}>Annuler</button> :
                        <button className="btn btn-outline-secondary" onClick={handleSetEditableTeam} title="Modifier le nom de l'équipe">
                            <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                            </svg>
                        </button>}
                </div>
                <div className='col-4 text-end'>
                    <button title="Supprimer l'équipe" type="button" className='btn btn-outline-danger mx-3' onClick={props.deleteTeam} team={props.team["name"]} index={props.index}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    </button>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    {
                        props.players_data.filter((player) => player["team"] !== undefined && player["team"] === props.team["name"]).map((player, index2) => {
                            return (
                                <InscriptionsTeamsPlayer teams={props.teams} player={player} changeTeam={props.playerChangeTeam} key={index2} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}