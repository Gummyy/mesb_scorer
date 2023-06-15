import React from 'react';

// A default nav bar component
export default function InscriptionsTable(props) {
    let start_name = props.name !== undefined ? props.name : "";

    let [new_table_name, setNewTableName] = React.useState(start_name);

    let [edited, setEdited] = React.useState(false);

    React.useEffect(() => {
        setNewTableName(props.name !== undefined ? props.name : "");
        setEdited(false);
    }, [props.name]);  // That looks like some massive bullshit but it does the job xD

    const handleNameChange = (event) => {
        event.preventDefault();
        setNewTableName(event.target.value)
        setEdited(event.target.value != start_name);
    }

    return (
        <form index={props.index} name={new_table_name} onSubmit={props.editTable}>
            <div className='row my-4'>
                <div className='col'>
                    Table {props.index + 1}
                </div>
                <div className='col'>
                    <label htmlFor={`T${props.index}`}>Nom</label>
                    <input type="text" className="form-control" id={`T${props.index}`} name={`T${props.index}`} value={new_table_name} onChange={handleNameChange} />
                </div>
                <div className='col text-center'>
                    {edited && <button type="button" title="Valider" className='btn btn-success mx-3 mt-2' onClick={props.editTable} index={props.index} name={new_table_name}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                    </svg>
                    </button>}<br />
                </div>
            </div>
        </form>
    )
}