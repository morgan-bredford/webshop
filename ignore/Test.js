import React, { useContext, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './contexts/UserContext'

function Test() {
    
    const context = useContext(UserContext)
console.log(context)
    //const [state, dispatch] = useReducer(context.testredu, context.state)
    
    const arr = ['ett', 'tva', 'tre']
  return (
    <div className="App" id="root2">
        <ul>
            {arr.map( (item,index) => <li key={index}><Link to={`/${index + 1}`}>{item}</Link></li>
            )}
        </ul>
      <a href="/1">testing</a>
     <button onClick={()=>context.dispatch({ type: 'login'})}>tryck</button>
     <img src="/images/hoodies.jpg" style={{width: '300px', height: '200px', backgroundColor: '#ccc'}}/>
     <div id="app"></div>
    </div> 
  );
}

export default Test;