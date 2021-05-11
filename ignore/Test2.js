import React, {useState} from 'react';
import { Redirect } from 'react-router';
import axios from 'axios'

function Test2() {
    const [re, setRe] = useState(false)

    const addProduct = () => {
        const product = {
            name: 'Pineapple',
            category: 'Fruit',
            description: 'A pointy fruit',
            image: 'path',
            price: 3.05,
            quantity: 14
        }
        axios
            .post("http://127.0.0.1:5000/add", product)
            .then((res) => { 
                console.log(res)
            })
    }
    
  return (
    <div className="App" id="root2">
    {re ? <Redirect to="/2" /> : null}
      <a href="/">testing</a>
     <button onClick={ addProduct }>tryck2</button>
     <div id="app"></div>
    </div> 
  );
}

export default Test2;