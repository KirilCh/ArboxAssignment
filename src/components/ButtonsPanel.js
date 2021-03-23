import React , {useState, useEffect} from 'react'
import Countdown from './Countdown'
import './buttons.scss'
const ButtonsPanel = (props) =>
{
    const {arrivalTime}=props;
    const [btnArrival, setArrivalTime] = useState(()=>arrivalTime);
 
    useEffect(()=>{
        setArrivalTime(arrivalTime);
    },[arrivalTime])

    return (
        <div className='panel panel-default'>
            <div className='panel-body'>
                <button className='button' id='btn0' onClick={() => props.onClick(0)}>GF<br></br><Countdown seconds={arrivalTime[0]}/></button>
                <button className='button' id='btn1' onClick={() => props.onClick(1)}>1F<br></br><Countdown seconds={arrivalTime[1]}/></button>
                <button className='button' id='btn2' onClick={() => props.onClick(2)}>2F<br></br><Countdown seconds={btnArrival[2]}/></button>
                <button className='button' id='btn3' onClick={() => props.onClick(3)}>3F<br></br><Countdown seconds={btnArrival[3]}/></button>
                <button className='button' id='btn4' onClick={() => props.onClick(4)}>4F<br></br><Countdown seconds={btnArrival[4]}/></button>
                <button className='button' id='btn5' onClick={() => props.onClick(5)}>5F<br></br><Countdown seconds={btnArrival[5]}/></button>
                <button className='button' id='btn6' onClick={() => props.onClick(6)}>6F<br></br><Countdown seconds={btnArrival[6]}/></button>
                <button className='button' id='btn7' onClick={() => props.onClick(7)}>7F<br></br><Countdown seconds={btnArrival[7]}/></button>
            </div>
        </div>
    )
}

export default ButtonsPanel