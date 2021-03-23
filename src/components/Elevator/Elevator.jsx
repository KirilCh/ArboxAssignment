import React from 'react'


const Elevator=(props)=> {

    return (
        <div>
         
          <div className='flex-container'>
            <div class="box">
              <div>{props.floor}</div>
            </div>
            
          </div>
        </div>
    )
}

export default Elevator
