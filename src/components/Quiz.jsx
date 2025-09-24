import React from 'react'

const Quiz = () => {
  return (
    
      <div className='container'>
    <h1> Quiz App</h1>
    <hr />
    <h2>Which device is reqired for the Internet connection?</h2>
    <ul>
     <li>Modem</li>  
      <li>Router</li>
       <li>LAN Cable</li>
        <li>Pen Drive</li> 
    </ul>
    <button>Next</button>
    <div className='index'>1 to 5 questions</div>
      </div>
    
  )
}

export default Quiz
