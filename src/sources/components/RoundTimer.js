import React, { useEffect } from 'react';

export default function Round(props) {

    let [display, setDisplay] = React.useState(props.HHmmss_time(new Date().getTime() - props.started_at >= 0 ? (new Date().getTime() - props.started_at) : (props.started_at - new Date().getTime()), 'timer'))

    React.useEffect(() => {
        const interval = setInterval(() => {
            setDisplay(props.HHmmss_time(new Date().getTime() - props.started_at >= 0 ? (new Date().getTime() - props.started_at) : (props.started_at - new Date().getTime()), 'timer'));
            //console.log("coucou");
        }, 1000);

        return () => clearInterval(interval);
    }, [display])

    return (
        <div>
            <div className='row mb-3'>
                <div className='col text-begin'>
                    <h3>{new Date().getTime() - props.started_at >= 0 ? `Durée : ${display} ` : `Commence dans ${display}`}</h3>
                </div>
                <div className='col text-end'>
                    <h3>
                        {new Date().getTime() - props.started_at >= 0 ?
                            <span style={new Date().getTime() - props.last_turn >= 0 ? {color: 'red'} : {}} >Dernier tour à {new Date(props.last_turn).toLocaleTimeString("fr-FR")}</span>
                            :
                            <span>Début des parties à {new Date(props.started_at).toLocaleTimeString("fr-FR")} </span>
                        }
                    </h3>
                </div>
            </div>
        </div>
    )
}