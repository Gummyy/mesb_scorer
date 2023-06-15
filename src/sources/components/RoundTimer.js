import React, { useEffect } from 'react';

export default function Round(props) {

    const HHmmss_time = (duration, type) => {
        let positive = duration >= 0;
        if(!positive) {
            duration = -duration
        }
        duration = parseInt(duration / 1000);
        const SS = duration % 60;
        duration = parseInt(duration / 60);
        const MM = duration % 60;
        duration = parseInt(duration / 60);
        
        if(type == "timer") {
            return `${positive ? '' : '-'}${duration.toString().padStart(2, '0')}:${MM.toString().padStart(2, '0')}:${SS.toString().padStart(2, '0')}`;
        } else if(type == "spoken") {
            if(duration == 0) {
                if(MM == 0) {
                    return `${positive ? '' : '-'}${SS} seconde${SS > 1 ? 's' : ''}`
                } else {
                    return `${positive ? '' : '-'}${MM} minute${MM > 1 ? 's' : ''} et ${SS} seconde${SS > 1 ? 's' : ''}`
                }
            } else {
                return `${positive ? '' : '-'}${duration} heure${duration > 1 ? 's' : ''}, ${MM} minute${MM > 1 ? 's' : ''} et ${SS} seconde${SS > 1 ? 's' : ''}`
            }
        }
    }

    let [display, setDisplay] = React.useState(HHmmss_time(new Date().getTime() - props.started_at >= 0 ? (new Date().getTime() - props.started_at) : (props.started_at - new Date().getTime()), 'timer'))

    React.useEffect(() => {
        const interval = setInterval(() => {
            setDisplay(HHmmss_time(new Date().getTime() - props.started_at >= 0 ? (new Date().getTime() - props.started_at) : (props.started_at - new Date().getTime()), 'timer'));
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