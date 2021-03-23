import React , {useEffect, useState} from 'react'

const Countdown = ({seconds}) =>
{
    const[cntDown, setCounter] = useState(seconds)

    useEffect(()=>{
        setCounter(seconds);
    },[seconds])

    React.useEffect(() => {
      cntDown > 0 && setTimeout(() => setCounter(cntDown - 1), 1000);
      }, [cntDown]);

      return (
        <div className='countdown'>
          <h4>{cntDown}</h4>
        </div>
      );
}
export default Countdown