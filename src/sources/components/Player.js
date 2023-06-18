import React, { useEffect } from 'react';

export default function Player(props) { // player, round_number
    //console.log("Player : " + JSON.stringify(props.player));
    //let [player, setPlayer] = [props.player, props.setPlayer];
    console.log(props.player);
    let last_round_score = 0;
    let last_round_goalaverage = 0;
    if(props.round_number >= 2) {
        last_round_score = parseInt(props.player["points"][props.round_number-2]);
        last_round_goalaverage = parseInt(props.player["goalaverages"][props.round_number-2]);
    }
    return (
        <div className='col text-center'>
            <div className='row'>
                <div className='col'>
                    {props.player["name"]}{!["", undefined].includes(props.player["full_name"]) && props.detailedView && (" - " + props.player["full_name"])}<br />
                    {!["", undefined].includes(props.player["armee"]) && props.detailedView && ("(" + props.player["armee"] + ")")}
                </div>
            </div>
            {props.player["points"][props.round_number-1] !== undefined &&
            (
            <div>
                <div className='row'>
                    <div className='col'>
                        Score
                    </div>
                    <div className='col'>
                        Goal average
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        {parseInt(props.player["points"][props.round_number-1]) - last_round_score}    
                    </div>
                    <div className='col'>
                        {parseInt(props.player["goalaverages"][props.round_number-1]) - last_round_goalaverage}
                    </div>
                </div>
            </div>)}
        </div>
    );
}