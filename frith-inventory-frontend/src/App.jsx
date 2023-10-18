import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  // POST request using fetch()
  fetch("http://localhost:5000/add", {

    // Adding method type
    method: "POST",

    // Adding body or contents to send
    body: JSON.stringify({
      title: "foo",
      body: "bar",
      userId: 1
    
    }),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })

    // Converting to JSON
    .then(response => response.json())

    // Displaying results to console
    .then(json => console.log(json));

  return (
    <div className="App">
      <div className='App-header'>
        <h1>Frith Friends</h1>
      </div>

    </div>
  )
}

export default App
