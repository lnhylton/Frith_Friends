import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState("");
  const [latestResponse, setLatestResponse] = useState("");
  const [tableName, setTableName] = useState("consumable"); // Default value
  const [itemId, setItemId] = useState("");
  const [updateData, setUpdateData] = useState("");

  const handleDataChange = (event) => {
    setData(event.target.value);
  };

  const handleTableNameChange = (event) => {
    setTableName(event.target.value);
  };

  const handleItemIdChange = (event) => {
    setItemId(event.target.value);
  };

  const handleUpdateDataChange = (event) => {
    setUpdateData(event.target.value);
  };

  const handleDataSubmit = () => {
    if (data) {
      // Perform your API call here for adding data
      fetch("http://localhost:5000/add", {
        method: "POST",
        body: JSON.stringify({
          data: data
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then((response) => response.json())
        .then((res) => {
          setLatestResponse(res.status);
          console.log(res);
        })
        .catch((e) => {
          setLatestResponse("failed");
        });
    }
  };

  const handleUpdateSubmit = () => {
    if (tableName && itemId && updateData) {
      // Perform your API call here for updating data
      fetch("http://localhost:5000/update", {
        method: "PUT",
        body: JSON.stringify({
          tableName: tableName,
          itemId: itemId,
          updateData: updateData
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then((response) => response.json())
        .then((res) => {
          setLatestResponse(res.status);
          console.log(res);
        })
        .catch((e) => {
          setLatestResponse("failed");
        });
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Frith Friends</h1>
      </div>
      <label>This will add an item to the consumable table:</label>
      <input
        className="input"
        type="database"
        placeholder="Data to Add"
        onChange={handleDataChange}
        value={data}
      />
      <button type="submit" onClick={handleDataSubmit}>
        Submit Add
      </button>

      <label>This will update an item to the selected table:</label>
      <select
        className="input"
        onChange={handleTableNameChange}
        value={tableName}
      >
        <option value="consumable">consumable</option>
        <option value="consumable_location">consumable_location</option>
        <option value="machine">machine</option>
        <option value="machine_location">machine_location</option>
        <option value="non_consumable">non_consumable</option>
        <option value="non_consumable_location">non_consumable_location</option>
        <option value="room">room</option>
        <option value="storage_medium">storage_medium</option>
      </select>
      <input
        className="input"
        type="text"
        placeholder="Item ID"
        onChange={handleItemIdChange}
        value={itemId}
      />
      <input
        className="input"
        type="text"
        placeholder="Update Data"
        onChange={handleUpdateDataChange}
        value={updateData}
      />
      <button type="submit" onClick={handleUpdateSubmit}>
        Submit Update
      </button>

      {latestResponse === "success" ? (
        <label className="success">Success!</label>
      ) : latestResponse === "failed" ? (
        <label className="error">Failed!</label>
      ) : null}
    </div>
  );
}

export default App;
