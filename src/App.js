import './App.css';
import React,{useState, useRef} from 'react'
import ButtonsPanel from './components/ButtonsPanel'
import Lift from './components/Elevator'
import arrivalBell from './media/elevator_arrival_bell.mp3'


class Queue
{
  constructor()
  {
    this.items=[]
  }
  //Functions to implement
  enqueue(elevatorReq)
  {
    this.items.push(elevatorReq)
  }
  queueLength()
  {
    return this.items.length
  }
  dequeue()
  {
    if(this.isEmpty())
    {
      return 'Underflow'
    }
    return this.items.shift()
  }
  isEmpty()
  {
    return this.items.length===0
  }
  isReqExist(floorReq)
  {
    if(this.items.includes(floorReq))
    {
      return true
    }
    else return false
  }
  front()
  {
    if(this.isEmpty())
    {
      return 0
    }
    return this.items[0]
  }
}

//contains init of the lifts
const liftsArray=[{id:1, floor:0}, {id:2,floor:0, style:{backgroundColor:'greenyellow', marginLeft:'15%'}}, 
{id:3, floor:0, style:{backgroundColor:'lightblue',marginLeft:'30%'}}];
const liftCallsQueue = new Queue()

//Sound file
const bell = new Audio(arrivalBell)

//Countdown till elevator arrives
const initArrivalTimes = [0,0,0,0,0,0,0,0]

function App() {
  const [lift,setLiftMoving]=useState(()=>liftsArray)
  const liftAvailability = useRef([])
  const [timeToArrival, setArrivalTime] = useState(()=>initArrivalTimes)

  const onUpdateFloor = (flr, isFromQueueu) =>
  {
    const temp=[...lift]
    
    if(temp.some(el => el.floor === flr))
    {
      console.log("Theres an elevator on your floor already")
      return
    }

    if(liftAvailability.current.length===0) //Initial case of program
    {
      liftAvailability.current.push(true)
      liftAvailability.current.push(true)
      liftAvailability.current.push(true)
    }
    
    //Decide which of the elevators is the closest to the desired floor
    
    const btn = document.getElementById('btn'+flr)
    if(btn)
    {
      btn.style.backgroundColor='red'
    }
    var distanceFromDesiredFloor = []
    for(var i=0;i<temp.length;i++)
    {
      //Verify if elevator is busy or available
      if(liftAvailability.current[i])
      {
        distanceFromDesiredFloor.push(Math.abs(temp[i].floor-flr))
      }
      else
      {
        distanceFromDesiredFloor.push(-1)
      }
    }
    const sendElevator = distanceFromDesiredFloor.indexOf(Math.min.apply(null, distanceFromDesiredFloor.filter(function(n) {return n>=0})))
    const tempTimeToArrival = [...timeToArrival]
    if(sendElevator===-1)
    {
      console.log("no available lifts")
      if(liftCallsQueue.isReqExist(flr))
      {
        return
      }
      liftCallsQueue.enqueue(flr)
    }
    else
    {
      if(tempTimeToArrival[flr]===0 && (liftAvailability.current[0] || liftAvailability.current[1] || liftAvailability.current[2]))
      {
        tempTimeToArrival[flr] = 10
      }
      liftAvailability.current[sendElevator]=false
      temp[sendElevator].floor=flr
      setTimeout(function() {setLiftMoving(temp)}, 2000)
      setArrivalTime(tempTimeToArrival)
    }
  }

  const liftStopped = (liftId,stoppedAtFloor) =>
  {
    bell.play()
    const tempTimeToArrival = [...timeToArrival]
    tempTimeToArrival[stoppedAtFloor]=0
    setTimeout(function() {liftAvailability.current[liftId]=true}, 0)
    const btn = document.querySelectorAll('button')[stoppedAtFloor].style.backgroundColor='greenyellow'

    if(liftCallsQueue.isEmpty() === false)
    {
      setTimeout(function() {onUpdateFloor(liftCallsQueue.dequeue(), true)},2000)
    }
  }
  
  return (
    <div className="App">
       <header>Elevator testing</header>
       <div className='container'>
       <ButtonsPanel className='panel' arrivalTime={timeToArrival} onClick={onUpdateFloor}/>
       <div style={{float:'left'}}>{lift.map((id)=>{return (<Lift id={id.id} floor={id.floor} style={id.style} eventEnd={liftStopped}/>)})}</div>
       </div>
    </div>
  );
}

export default App;
