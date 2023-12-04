import { useState, useEffect } from 'react';
import React from "react";
import { NavLink, Routes, Route } from "react-router-dom"

import Guest from "./pages/Guest"
import ULA from "./pages/ULA"
import Admin from "./pages/Admin"
import './App.css';
import LoginForm from './login'; // Assuming the login file is in the same directory
import FrithLogo from './components/frith_logo.jsx'
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

  // Holds the data displayed to the main table
  const [tableData, setTableData] = useState({});

  const [loggedIn, setLoggedIn] = useState(false); // Login state

  /* -------------------------------------------------------------------------- */
  /*                                  useEffect                                 */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    // Runs on mount
    getTableData()

    // Runs on dismount
    return () => {
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

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
  /*                                 Guest Data                                 */
  /* -------------------------------------------------------------------------- */

  const getTableData = () => {
    const tableNameFilter = "consumable"
    if (tableNameFilter) {
      fetch(`http://localhost:${BACKEND_PORT}/get_table?table_name=${tableNameFilter}`)
        .then((response) => response.json())
        .then((data) => {
          setTableData(data.data)
        })
        .catch((e) => {
          console.log("failed")
        });
    }
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
          setRetrievedData(data.data);
          setEditedDataUpdate(data.data);
          console.log(data.data);
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
      <div className="App-header">
        <FrithLogo className="FrithLogo" /> Frith Inventory
      </div>

      {
            loggedIn ?
              <div className="popup">
                <LoginForm onLogin={handleLogout} onBack={handleBackToMainContent} />
              </div>
              :
              <></>
          }

      <nav className="navbar">
            <ul>
              <NavLink style={({ isActive }) => ({
                color: isActive ? '#fff' : '',
                background: isActive ? '#888' : ''
              })} to="/">
                Guest
              </NavLink>
              <NavLink style={({ isActive }) => ({
                color: isActive ? '#fff' : '',
                background: isActive ? '#888' : ''
              })} to="/ula">
                ULA
              </NavLink>
              <NavLink style={({ isActive }) => ({
                color: isActive ? '#fff' : '',
                background: isActive ? '#888' : ''
              })} to="/admin">
                Admin
              </NavLink>
              {!loggedIn ? (
                <button className="login-button" onClick={handleLogin}>
                  Login
                </button>
              ) : null}
            </ul>
          </nav>

      <div className="main">
        <div className="leftbar">
          
        </div>
        <div className="rightbar">
          {/* ---------------------------- navigation ----------------------------- */}
          
          <Routes>
            <Route path="/" element={<Guest data={tableData} />} />
            <Route path="/ula" element={<ULA data={tableData} />} />
            <Route path="/admin" element={<Admin data={tableData} />} />
          </Routes>

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
              <option value="storage_medium_location">storage_medium_location</option>
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
              <option value="storage_medium_location">storage_medium_location</option>
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
              <option value="storage_medium_location">storage_medium_location</option>
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
      </div>
    </div>
  );
}

export default App;