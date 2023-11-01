import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [count, setCount] = useState(0)
  const [data, setData] = useState("")
  const [latestResponse, setLatestResponse] = useState("")

  const testInput = event => {
    setData(event.target.value);
  };

  const testSubmit = event => {
    // POST request using fetch()
    fetch("http://localhost:5000/add", {

      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        data: data

      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

      // Converting to JSON
      .then(response => response.json())

      // Displaying results to console
      .then(res => {
        setLatestResponse(res.status)
        console.log(res)
      })
      .catch((e) => {
        setLatestResponse("failed")
      })
  }



  return (
    <div className="App">
      <div className='App-header'>
        <h1>Frith Friends</h1>

      </div>
      <label>This will add an item to "consumables" table</label>

      <input className="input"
        type="database"
        name="database"
        onChange={testInput}
        value={data}
      />
      <button type="submit" onClick={testSubmit} >Submit</button>
      {
        latestResponse === "success" ?
          <label className="success">Success!</label>
          :
          <></>
      }
      {
        latestResponse === "failed" ?
          <label className="success">Failed!</label>
          :
          <></>
      }
    </div>
  )
}

export default App
