import { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './login'; // Assuming the login file is in the same directory

const BACKEND_PORT = 5001

function App() {
  const [latestResponseAdd, setLatestResponseAdd] = useState("");
  const [latestResponseUpdate, setLatestResponseUpdate] = useState("");
  const [latestResponseDelete, setLatestResponseDelete] = useState("");

  const [tableNameUpdate, setTableNameUpdate] = useState("consumable"); // Default value
  const [tableNameDelete, setTableNameDelete] = useState("consumable"); // Default value
  const [retrievedDataUpdate, setRetrievedDataUpdate] = useState(null); // Store retrieved data
  const [itemIdUpdate, setItemUpdate] = useState("");
  const [itemIdDelete, setItemDelete] = useState("");
  const [editedDataUpdate, setEditedDataUpdate] = useState({});

  const [tableNameAdd, setTableNameAdd] = useState("consumable"); // Default value
  const [retrievedDataAdd, setRetrievedDataAdd] = useState(null); // Store retrieved data
  const [editedDataAdd, setEditedDataAdd] = useState({});

  const [loggedIn, setLoggedIn] = useState(false); // Login state

  const handleTableNameChangeUpdate = (event) => {
    setTableNameUpdate(event.target.value);
  };

  const handleTableNameChangeDelete = (event) => {
    setTableNameDelete(event.target.value);
  };

  const handleTableNameChangeAdd = (event) => {
    setTableNameAdd(event.target.value);
  };

  const handleItemIdChange = (event) => {
    setItemUpdate(event.target.value);
  };

  const handleItemIdDeleteChange = (event) => {
    setItemDelete(event.target.value);
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

  /* -------------------------------------------------------------------------- */
  /*                                   Login                                    */
  /* -------------------------------------------------------------------------- */

  const handleBackToMainContent = () => {
    setLoggedIn(false);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  /* -------------------------------------------------------------------------- */
  /*                                     Add                                    */
  /* -------------------------------------------------------------------------- */

  const handleRetrieveAddData = () => {
    if (tableNameAdd) {
      fetch(`http://localhost:${BACKEND_PORT}/get_table_attributes?table_name=${tableNameAdd}`)
        .then((response) => response.json())
        .then((data) => {
          setRetrievedDataAdd(data.data);
          console.log(data.data)
        })
        .catch((e) => {
          latestResponseAdd("failed");
        });
    }
  };

  const handleAddDataSubmit = () => {
    console.log(editedDataAdd)
    // Perform your API call here to submit the updated data
    fetch(`http://localhost:${BACKEND_PORT}/add`, {
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
        setLatestResponseAdd(res.status);
        console.log(res);
      })
      .catch((e) => {
        setLatestResponseAdd("failed");
      });
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Update                                   */
  /* -------------------------------------------------------------------------- */

  const handleRetrieveUpdateData = () => {
    if (tableNameUpdate && itemIdUpdate) {
      fetch(`http://localhost:${BACKEND_PORT}/get_data?table_name=${tableNameUpdate}&row_id=${itemIdUpdate}`)
        .then((response) => response.json())
        .then((data) => {
          setRetrievedDataUpdate(data.data);
          setEditedDataUpdate(data.data);
        })
        .catch((e) => {
          setLatestResponseUpdate("failed");
        });
    }
  };

  const handleUpdateDataSubmit = () => {
    // Perform your API call here to submit the updated data
    fetch(`http://localhost:${BACKEND_PORT}/update`, {
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
        setLatestResponseUpdate(res.status);
        console.log(res);
      })
      .catch((e) => {
        setLatestResponseUpdate("failed");
      });
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Delete                                   */
  /* -------------------------------------------------------------------------- */

  const handleDeleteSubmit = () => {
    console.log(itemIdDelete)
    // Perform your API call here to submit the updated data
    fetch(`http://localhost:${BACKEND_PORT}/delete`, {
      method: "DELETE",
      body: JSON.stringify({
        tableName: tableNameAdd,
        deleteId: itemIdDelete
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((res) => {
        setLatestResponseDelete(res.status);
        console.log(res);
      })
      .catch((e) => {
        setLatestResponseDelete("failed");
      });
  };

  /* -------------------------------------------------------------------------- */
  /*                                    HTML                                    */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="App">
      {!loggedIn ? (
        <button className="login-button" onClick={handleLogin}>
          Login Page
        </button>
      ) : null}

      {loggedIn ? (
        <div>
          <LoginForm onLogin={handleLogout} onBack={handleBackToMainContent} />
        </div>
      ) : (
        <div>
          <div className="App-header">
            <h1>Frith Friends</h1>
          </div>

          {/* -------------------------------- add -------------------------------- */}

          <div className="itembox">
            <h2>Add an item to the table selected</h2>
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
                <h3>Data to Add</h3>
                {Object.entries(retrievedDataAdd).map(([key, value]) => (
                  <div key={key} className="data-box">
                    <label className="data-label">
                      {value}:
                    </label>
                    <input
                      type="text"
                      className="input data-value"
                      onChange={(e) => handleEditValueAdd(value, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}

            <button type="submit" onClick={handleAddDataSubmit}>
              Submit Add Data
            </button>

            <label className="query-status">
              {latestResponseAdd}
            </label>
          </div>

          {/* -------------------------------- update ----------------------------- */}

          <div className="itembox">
            <h2>Update an item located in the table below</h2>
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

            {retrievedDataUpdate && (
              <div className="retrieved-data">
                <h3>Data to Update</h3>
                {Object.entries(retrievedDataUpdate).map(([key, value]) => (
                  <div key={key} className="data-box">
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
                ))}
              </div>
            )}
            <button type="submit" onClick={handleUpdateDataSubmit}>
              Submit Updated Data
            </button>

            <label className="query-status">
              {latestResponseUpdate}
            </label>
          </div>

          {/* -------------------------------- delete ----------------------------- */}

          <div className="itembox">
            <h2>This will delete an item to the selected table:</h2>
            <select
              className="input"
              onChange={handleTableNameChangeDelete}
              value={tableNameDelete}
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
              onChange={handleItemIdDeleteChange}
              value={itemIdDelete}
            />

            <button type="submit" onClick={handleDeleteSubmit}>
              Submit Delete
            </button>

            <label className="query-status">
              {latestResponseDelete}
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;