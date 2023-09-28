import React from 'react';

export default function InscriptionsNewTeamPlayer(props) {
    return (
        <div className='row'>
            <div className='col-9'>
                <label htmlFor={`newTeamP${props.index}`} className="form-check-label mx-1">{props.player["name"]}</label>
            </div>
            <div className='col-3'>
                <input type="checkbox" className="form-check-input me-4" id={`newTeamP${props.index}`} name={`newTeamP${props.index}`} checked={props.is_checked} index={props.index} onChange={props.handleCheckedChange} />
            </div>
        </div>
    );
}