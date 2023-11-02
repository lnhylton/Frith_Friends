import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState("");
  const [latestResponse, setLatestResponse] = useState("");
  const [tableName, setTableName] = useState("consumable"); // Default value
  const [itemId, setItemId] = useState("");
  const [updateData, setUpdateData] = useState("");
  const [retrievedData, setRetrievedData] = useState(null); // Store retrieved data
  const [editedData, setEditedData] = useState({});

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

  const handleEditValue = (key, value) => {
    setEditedData({ ...editedData, [key]: value });
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

  const handleRetrieveData = () => {
    if (tableName && itemId) {
      fetch(`http://localhost:5000/get_data?table_name=${tableName}&row_id=${itemId}`)
        .then((response) => response.json())
        .then((data) => {
          setRetrievedData(data.data);
          setEditedData(data.data);
        })
        .catch((e) => {
          setLatestResponse("failed");
        });
    }
  };

  const handleUpdateDataSubmit = () => {
    // Perform your API call here to submit the updated data
    fetch("http://localhost:5000/update", {
      method: "PUT",
      body: JSON.stringify({
        tableName: tableName,
        itemId: itemId,
        updateData: editedData
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

      <button type="submit" onClick={handleRetrieveData}>
        Retrieve Data
      </button>

      {latestResponse === "success" ? (
        <label className="success">Success!</label>
      ) : latestResponse === "failed" ? (
        <label className="error">Failed!</label>
      ) : null}

      {retrievedData && (
        <div className="retrieved-data">
          <h2>Retrieved Data</h2>
          {Object.entries(retrievedData).map(([key, value]) => (
            <div key={key} className="data-box">
              <div className="data-entry">
                <label className="data-label">
                  {key}:
                </label>
                <input
                  type="text"
                  className="input data-value"
                  value={editedData[key]}
                  onChange={(e) => handleEditValue(key, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}


      <button type="submit" onClick={handleUpdateDataSubmit}>
        Submit Updated Data
      </button>
    </div>
  );
}

export default App;