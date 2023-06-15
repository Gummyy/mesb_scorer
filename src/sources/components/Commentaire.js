import React, { useEffect } from 'react';

export default function Commentaire(props) { // player, round_number
    //console.log("Player : " + JSON.stringify(props.player));
    return (
        <div className='row text-center my-1'>
            {props.value}
        </div>
    );
}