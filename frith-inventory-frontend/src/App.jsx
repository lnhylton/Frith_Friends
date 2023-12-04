import { useState, useEffect } from 'react';
import React from "react";
import { NavLink, Routes, Route } from "react-router-dom"

import InventoryList from './components/data_list.jsx';
import './App.css';
import LoginForm from './login.jsx'; // Assuming the login file is in the same directory
import FrithLogo from './components/frith_logo.jsx'
import CreateUserForm from './components/create_user.jsx';
import DeleteForm from './components/delete.jsx';
import AddForm from './components/add.jsx';
const BACKEND_PORT = 5001

function App() {
  const [latestResponseUpdate, setLatestResponseUpdate] = useState("");

  const [tableNameUpdate, setTableNameUpdate] = useState("consumable"); // Default value
  const [retrievedDataUpdate, setRetrievedDataUpdate] = useState(null); // Store retrieved data
  const [itemIdUpdate, setItemUpdate] = useState("");
  const [editedDataUpdate, setEditedDataUpdate] = useState({});

  // Holds the data displayed to the main table
  const [tableData, setTableData] = useState({});
  const [tableFilter, setTableFilter] = useState("consumable");

  const [waitLogin, setWaitLogin] = useState(false); // Login state
  const [loggedIn, setLoggedIn] = useState(false); // Login state
  const [loggedInUsers, setLoggedInUsers] = useState({});
  const [createUserAppear, setCreateUserAppear] = useState(false);

  const [editID, setEditID] = useState({ id: 0, disp: false }); // ID to edit

  const [deleteAppear, setDeleteAppear] = useState(false);
  const [addAppear, setAddAppear] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                  useEffect                                 */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    // Runs on mount
    getTableData()
    getLoggedInUsers()

    console.log(loggedInUsers)

    // Runs on dismount
    return () => {
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn, tableFilter]);

  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  const handleTableNameChangeUpdate = (event) => {
    setTableNameUpdate(event.target.value);
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

  const handleTableFilterChange = (event) => {
    setTableFilter(event.target.value);
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Login                                    */
  /* -------------------------------------------------------------------------- */

  const handleBackToMainContent = () => {
    setWaitLogin(false);
  };

  const handleLogin = () => {
    setWaitLogin(true);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    fetch(`http://localhost:${BACKEND_PORT}/logout`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setLoggedIn(false)
      console.log(data)
      getLoggedInUsers()
    })
    .catch((e) => {
      console.log("failed")
    });
  };

  const getLoggedInUsers = () => {
    fetch(`http://localhost:${BACKEND_PORT}/get_logged_in_users`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setLoggedInUsers(data.data)
        console.log(data.data)
      })
      .catch((e) => {
        console.log("failed")
      });
  };

  /* -------------------------------------------------------------------------- */
  /*                                 Data List                                  */
  /* -------------------------------------------------------------------------- */

  const handleCreateUser = () => {
    setCreateUserAppear(true);
  };

  const handleBackCreateUser = () => {
    setCreateUserAppear(false);
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Data List                                  */
  /* -------------------------------------------------------------------------- */

  const getTableData = () => {
    const tableNameFilter = [tableFilter]
    if (tableNameFilter) {
      fetch(`http://localhost:${BACKEND_PORT}/get_table_data`, {
        method: "PUT",
        body: JSON.stringify({
          tableName: tableNameFilter
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setTableData(data.data)
          console.log(data.data)
        })
        .catch((e) => {
          console.log("failed")
        });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                     Add                                    */
  /* -------------------------------------------------------------------------- */

  const handleBackAdd = () => {
    setAddAppear(false);
  };

  const handleAdd = () => {
    setAddAppear(true);
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Update                                   */
  /* -------------------------------------------------------------------------- */

  const handleExitUpdate = () => {
    setEditID({id: 0, disp: false})
  }

  const handleRetrieveUpdateData = () => {
    console.log(tableFilter)
    console.log(editID.id)
    if (tableFilter && editID.id) {
      fetch(`http://localhost:${BACKEND_PORT}/get_data?table_name=${tableFilter}&row_id=${editID.id}`)
        .then((response) => response.json())
        .then((data) => {
          setRetrievedDataUpdate(data.data);
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
        tableName: tableFilter,
        itemId: editID.id,
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

  const handleBackDelete = () => {
    setDeleteAppear(false);
  };

  const handleDelete = () => {
    setDeleteAppear(true);
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
        waitLogin ?
          <div className="popup">
            <LoginForm onLogin={handleBackToMainContent} onBack={handleBackToMainContent} />
          </div>
          :
          <></>
      }

      {
        createUserAppear ?
          <div className="popup">
            <CreateUserForm onCreate={handleBackCreateUser} onBack={handleBackCreateUser} />
          </div>
          :
          <></>
      }

      {
        deleteAppear ?
          <div className="popup">
            <DeleteForm onBack={handleBackDelete} />
          </div>
          :
          <></>
      }

      {
        addAppear ?
          <div className="popup">
            <AddForm onBack={handleBackAdd} />
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
          {!loggedIn ?
            <button className="login-button" onClick={handleLogin}>
              Login
            </button>
            :
            <button className="login-button" onClick={handleLogout}>
              Logout
            </button>}

            <button className="login-button" onClick={handleCreateUser}>
              Create User
            </button>

            <button className="login-button" onClick={handleDelete}>
              Delete
            </button>

            <button className="login-button" onClick={handleAdd}>
              Add
            </button>
        </ul>
      </nav>

      <div className="main">
        <div className="leftbar">

        </div>
        <div className="rightbar">

          {/* ----------------------------- sort buttons -------------------------- */}
          <select
            className="input"
            onChange={handleTableFilterChange}
            value={tableFilter}
          >
            <option value="consumable">consumable</option>
            <option value="non_consumable">non_consumable</option>
            <option value="machine">machine</option>
          </select>

          {/* ---------------------------- navigation ----------------------------- */}

          <div className="guest">
            <Routes>
              <Route path="/" element={<InventoryList className="table" data={tableData} />} />
              <Route path="/ula" element={<InventoryList className="table" data={tableData} user="ula" setEditID={setEditID} />} />
              <Route path="/admin" element={<InventoryList className="table" data={tableData} user="admin" setEditID={setEditID} />} />
            </Routes>
          </div>

          {/* -------------------------------- update ----------------------------- */}
          {editID.disp ?
            <div className="popup">
              <div className="itembox">
                <button type="exit" onClick={handleExitUpdate}>
                  Exit
                </button>
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
            </div>
            :
            <></>
          }
        </div>
      </div>
    </div>
  );
}

export default App;