import React from 'react';

// A default nav bar component
export default function InscriptionsPlayer(props) {
    let start_name = props.player["name"] !== undefined ? props.player["name"] : "";
    let start_full_name = props.player["full_name"] !== undefined ? props.player["full_name"] : "";
    let start_armee = props.player["armee"] !== undefined ? props.player["armee"] : "";

    let [new_player_name, setNewPlayerName] = React.useState(start_name);
    let [new_player_full_name, setNewPlayerfull_name] = React.useState(start_full_name);
    let [new_player_armee, setNewPlayerArmee] = React.useState(start_armee);

    let [edited, setEdited] = React.useState(false);

    React.useEffect(() => {
        setNewPlayerArmee(props.player["armee"] !== undefined ? props.player["armee"] : "");
        setNewPlayerName(props.player["name"] !== undefined ? props.player["name"] : "");
        setNewPlayerfull_name(props.player["full_name"] !== undefined ? props.player["full_name"] : "");
        setEdited(false);
    }, [props.player["name"], props.player["full_name"], props.player["armee"]]);  // That looks like some massive bullshit but it does the job xD

    const handlefull_nameChange = (event) => {
        event.preventDefault();
        setNewPlayerfull_name(event.target.value)
        console.log(new_player_full_name);
        console.log(start_full_name);
        setEdited(new_player_name != start_name || event.target.value != start_full_name || new_player_armee != start_armee);
    }

    const handleNameChange = (event) => {
        event.preventDefault();
        setNewPlayerName(event.target.value)
        setEdited(event.target.value != start_name || new_player_full_name != start_full_name || new_player_armee != start_armee);
    }

    const handleArmeeChange = (event) => {
        event.preventDefault();
        setNewPlayerArmee(event.target.value)
        setEdited(new_player_name != start_name || new_player_full_name != start_full_name || event.target.value != start_armee);
    }

    return (
        <form>
            <div className='row my-4'>
                <div className='col'>
                    <label htmlFor={`P${props.player["full_name"]}_N${props.player["name"]}__full_name`}>Nom complet</label>
                    <input type="text" className="form-control" id={`P${props.player["full_name"]}_N${props.player["name"]}__full_name`} name={`P${props.player["full_name"]}_N${props.player["name"]}__full_name`} value={new_player_full_name} onChange={handlefull_nameChange} />
                </div>
                <div className='col'>
                    <label htmlFor={`P${props.player["full_name"]}_N${props.player["name"]}__name`}>Pseudonyme<span style={{color: "red"}}>*</span></label>
                    <input type="text" className="form-control" id={`P${props.player["full_name"]}_N${props.player["name"]}__name`} name={`P${props.player["full_name"]}_N${props.player["name"]}__name`} value={new_player_name} onChange={handleNameChange} />
                </div>
                <div className='col'>
                    <label htmlFor={`P${props.player["full_name"]}_N${props.player["name"]}__armee`}>Armée</label>
                    <input type="text" className="form-control" id={`P${props.player["full_name"]}_N${props.player["name"]}__armee`} name={`P${props.player["full_name"]}_N${props.player["name"]}__armee`} value={new_player_armee} onChange={handleArmeeChange} />
                </div>
                <div className='col text-center'>
                    {edited &&
                        <button title="Valider" type="submit" className='btn btn-success mx-3 my-1' onClick={props.editPlayer}
                    name={props.player["name"]} full_name={props.player["full_name"]} armee={props.player["armee"]}
                    new_name={new_player_name} new_full_name={new_player_full_name} new_armee={new_player_armee} index={props.index}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                        </svg>
                        </button>}<br />
                    <button title="Supprimer le joueur" type="button" className='btn btn-outline-danger mx-3 my-1' onClick={props.deletePlayer} name={props.player["name"]} full_name={props.player["full_name"]} armee={props.player["armee"]} index={props.index}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    </button>
                </div>
            </div>
        </form>
    )
}