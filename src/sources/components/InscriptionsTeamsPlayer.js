import React from 'react';

// A default nav bar component
export default function InscriptionsTeamsPlayer(props) {
    let [selectTeam, setSelectTeam] = React.useState(props.player["team"]);

    React.useEffect(() => {
        setSelectTeam(props.player["team"]);
    }, [props.player["team"]]);  // That looks like some massive bullshit but it does the job xD

    const handleTeamChange = (event) => {
        event.preventDefault();

        setSelectTeam(event.target.value);
    }

    let hasChanged = selectTeam !== props.player["team"];
    console.log("InscriptionsTeamsPlayer rendered")

    return (
        <div className='row my-1'>
            <div className='col-6'>
                {props.player["name"]}
            </div>
            <div className={hasChanged ? 'col-4' : 'col-6'}>
                <select className="form-select" id={`P${props.player["name"]}`} name={`P${props.player["name"]}`} value={selectTeam} onChange={handleTeamChange}>
                    <option value={selectTeam}>{selectTeam !== undefined ? selectTeam : "Aucune"}</option>
                    {
                        props.teams.map((team, index) => {
                            if(team["name"] === selectTeam) {
                                return "";
                            } else {
                                return <option key={index} value={team["name"]}>{team["name"] !== undefined ? team["name"] : "Aucune"}</option>
                            }
                        })
                    }
                </select>
            </div>
                {hasChanged && (
                    <div className='col-2'>
                        <button type="button" title="Valider" className='btn btn-success mx-3' onClick={props.changeTeam} player={props.player["name"]} newteam={selectTeam}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                            </svg>
                        </button>
                    </div>
                )}
        </div>
    );
}