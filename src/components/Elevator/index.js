import React, {useEffect} from 'react'
import './Elevator.scss'

const Lift = ({id, floor, style, eventEnd}) =>
{
    const flr = floor
    useEffect(() => {
        const lift = document.querySelectorAll('.lift')
        let currPosition = lift[id-1].style.bottom
        
        switch(flr)
        {
            case 0:
                lift[id-1].style.bottom = 137+'px'
                break
            case 1:
                lift[id-1].style.bottom = 185+'px'
                break
            case 2:
                lift[id-1].style.bottom = 250+'px'
                break
            case 3:
                lift[id-1].style.bottom = 320+'px'
                break
            case 4:
                lift[id-1].style.bottom = 380+'px'
                break
            case 5:
                lift[id-1].style.bottom = 450+'px'
                break
            case 6: 
                lift[id-1].style.bottom = 515+'px'
                break
            case 7:
                lift[id-1].style.bottom = 585+'px'
                break
            default:lift[id-1].style.bottom = 125+'px'
        }

        setTimeout(function() 
        {
            if((currPosition && currPosition !== lift[id-1].style.bottom))
            {
                console.log('Inside index.js')
                currPosition=lift[id-1].style.bottom
                eventEnd(id-1, flr)
            }
        },10000)
    }, [flr])

    return (<div id={id} style={style} className='lift'></div>)
}
export default Lift