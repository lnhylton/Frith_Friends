import { useState, useEffect } from 'react';
import './App.css';

const BACKEND_PORT = 5001

function App() {
  const [data, setData] = useState("");
  const [latestResponse, setLatestResponse] = useState("");

  const [tableNameUpdate, setTableNameUpdate] = useState("consumable"); // Default value
  const [retrievedDataUpdate, setRetrievedDataUpdate] = useState(null); // Store retrieved data
  const [itemIdUpdate, setItemUpdate] = useState("");
  const [editedDataUpdate, setEditedDataUpdate] = useState({});

  const [tableNameAdd, setTableNameAdd] = useState("consumable"); // Default value
  const [retrievedDataAdd, setRetrievedDataAdd] = useState(null); // Store retrieved data
  const [editedDataAdd, setEditedDataAdd] = useState({});

  const handleDataChange = (event) => {
    setData(event.target.value);
  };

  const handleTableNameChangeUpdate = (event) => {
    setTableNameUpdate(event.target.value);
  };

  const handleTableNameChangeAdd = (event) => {
    setTableNameAdd(event.target.value);
  };

  const handleItemIdChange = (event) => {
    setItemUpdate(event.target.value);
  };

  const handleUpdateDataChange = (event) => {
    setUpdateData(event.target.value);
  };

  const handleEditValueUpdate = (key, value) => {
    setEditedDataUpdate({ ...editedDataUpdate, [key]: value });
  };

  const handleEditValueAdd = (key, value) => {
    setEditedDataAdd({ ...editedDataAdd, [key]: value });
  };

  const handleRetrieveAddData = () => {
    if (tableNameAdd) {
      fetch(`http://localhost:${BACKEND_PORT}/get_table_attributes?table_name=${tableNameAdd}`)
        .then((response) => response.json())
        .then((data) => {
          setRetrievedDataAdd(data.data);
          console.log(data.data)
        })
        .catch((e) => {
          setLatestResponse("failed");
        });
    }
  };

  const handleRetrieveUpdateData = () => {
    if (tableNameUpdate && itemIdUpdate) {
      fetch(`http://localhost:${BACKEND_PORT}/get_data?table_name=${tableNameUpdate}&row_id=${itemIdUpdate}`)
        .then((response) => response.json())
        .then((data) => {
          setRetrievedDataUpdate(data.data);
          setEditedDataUpdate(data.data);
        })
        .catch((e) => {
          setLatestResponse("failed");
        });
    }
  };

  const handleUpdateDataSubmit = () => {
    // Perform your API call here to submit the updated data
    fetch("http://localhost:${BACKEND_PORT}/update", {
      method: "PUT",
      body: JSON.stringify({
        tableName: tableNameUpdate,
        itemId: itemIdUpdate,
        updateData: editedDataUpdate
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

  const handleAddDataSubmit = () => {
    console.log(editedDataAdd)
    // Perform your API call here to submit the updated data
    fetch("http://localhost:${BACKEND_PORT}/add", {
      method: "PUT",
      body: JSON.stringify({
        tableName: tableNameAdd,
        addData: editedDataAdd
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
      <select
        className="input"
        onChange={handleTableNameChangeAdd}
        value={tableNameAdd}
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

      <button type="submit" onClick={handleRetrieveAddData}>
        Retrieve Data
      </button>

      {retrievedDataAdd && (
        <div className="retrieved-data">
          <h2>Retrieved Data</h2>
          {Object.entries(retrievedDataAdd).map(([key, value]) => (
            <div key={key} className="data-box">
              <div className="data-entry">
                <label className="data-label">
                  {value}:
                </label>
                <input
                  type="text"
                  className="input data-value"
                  onChange={(e) => handleEditValueAdd(value, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <button type="submit" onClick={handleAddDataSubmit}>
        Submit Add Data
      </button>


      <label>This will update an item to the selected table:</label>
      <select
        className="input"
        onChange={handleTableNameChangeUpdate}
        value={tableNameUpdate}
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
        value={itemIdUpdate}
      />

      <button type="submit" onClick={handleRetrieveUpdateData}>
        Retrieve Data
      </button>

      {latestResponse === "success" ? (
        <label className="success">Success!</label>
      ) : latestResponse === "failed" ? (
        <label className="error">Failed!</label>
      ) : null}

      {retrievedDataUpdate && (
        <div className="retrieved-data">
          <h2>Retrieved Data</h2>
          {Object.entries(retrievedDataUpdate).map(([key, value]) => (
            <div key={key} className="data-box">
              <div className="data-entry">
                <label className="data-label">
                  {key}:
                </label>
                <input
                  type="text"
                  className="input data-value"
                  value={editedDataUpdate[key]}
                  onChange={(e) => handleEditValueUpdate(key, e.target.value)}
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