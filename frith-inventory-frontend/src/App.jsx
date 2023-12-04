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

import StatForm from './stats.jsx'; // Assuming the login file is in the same directory
import ScatterPlot from './components/scatterplot.jsx';


const BACKEND_PORT = 5001

function App() {
  const [latestResponseUpdate, setLatestResponseUpdate] = useState("");

  const [retrievedDataUpdate, setRetrievedDataUpdate] = useState(null); // Store retrieved data
  const [editedDataUpdate, setEditedDataUpdate] = useState({});

  // Holds the data displayed to the main table
  const [tableData, setTableData] = useState({});
  const [tableFilter, setTableFilter] = useState("consumable");

  const [waitLogin, setWaitLogin] = useState(false); // Login state
  const [loggedIn, setLoggedIn] = useState(false); // Login state
  const [loggedInUsers, setLoggedInUsers] = useState({});
  const [createUserAppear, setCreateUserAppear] = useState(false);

  const [itemToEdit, setItemToEdit] = useState({ id: 0, disp: false });

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
  }, [loggedIn, tableFilter, itemToEdit, deleteAppear, addAppear]);

  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  const handleEditValueUpdate = (key, value) => {
    setEditedDataUpdate({ ...editedDataUpdate, [key]: value });
  };

  const handleTableFilterChange = (event) => {
    setTableFilter(event.target.value);
  };
  /* -------------------------------------------------------------------------- */
  /*                                   Stat                                     */
  /* -------------------------------------------------------------------------- */

  const [tableNameOptions] = useState(["consumable", "non_consumable", "machine"]);
  const [tableName, setTableName] = useState("");
  const [valueOptions, setValueOptions] = useState([]);
  const [selectItem, setSelectedItem] = useState("");
  const [consumableStatOptions] = useState(["stock", "hidden"]);
  const [nonconsumableStatOptions] = useState(["inventory_count", "hidden"]);
  const [machineStatOptions] = useState(["functional"]);
  const [selectStat, setSelectedStat] = useState("");
  const [changeData, setChangeData] = useState({});


  const handleTableNameChange = (event) => {
    const selectedTableName = event.target.value;

    if (!selectedTableName) {
      setValueOptions([]);

    }
    setSelectedItem("");
    setSelectedStat("");

    setTableName(selectedTableName);
  }

  const handleItemChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedItem(selectedValue);
    setChangeData({});

  };

  const handleStatChange = (event) => {
    const selectedStat = event.target.value;
    setSelectedStat(selectedStat);
    setChangeData({});
  }


  useEffect(() => {
    if (tableName) {
      fetchItems();
    }
  }, [tableName]);

  // Check conditions to determine if the button should be disabled
  const isButtonDisabled = tableName === '' || tableName === null ||
    selectItem === '' || selectItem === null ||
    selectStat === '' || selectStat === null;

  const handleButtonClick = () => {
    //generate the graph
    console.log("Clicked the button")
    // Query the database to see if there is data to display as statistics
    fetchChanges();
    // There needs to be two points of data to display
  };

  const fetchItems = () => {
    if (tableName) {
      fetch(`http://localhost:${BACKEND_PORT}/get_items?table_name=${tableName}`)
        .then((response) => response.json())
        .then((data) => {
          setValueOptions(data.data);
          console.log(data.data)
        })
        .catch((e) => {
          latestResponseAdd("failed");
        });
    }
  };

  const fetchChanges = () => {
    if (selectItem) {
      fetch(`http://localhost:${BACKEND_PORT}/get_changes?table_name=${tableName}&item_name=${selectItem}&query=${selectStat}`)
        .then((response) => response.json())
        .then((data) => {
          setChangeData(data.data);
          console.log(data.data)
        })
        .catch((e) => {
          latestResponseAdd("failed");
        });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Login                                    */
  /* -------------------------------------------------------------------------- */

  const handleBackToMainContent = () => {
    setWaitLogin(false);
    getLoggedInUsers();
  };

  const handleLogin = () => {
    setWaitLogin(true);
    setLoggedIn(true);
    getLoggedInUsers();
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
    setItemToEdit({ id: 0, disp: false })
  }

  const handleRetrieveUpdateData = () => {
    console.log(tableFilter)
    console.log(itemToEdit.id)
    if (tableFilter && itemToEdit.id) {
      fetch(`http://localhost:${BACKEND_PORT}/get_data?table_name=${tableFilter}&row_id=${itemToEdit.id}`)
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
        itemId: itemToEdit.id,
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
            background: isActive ? '#888' : '',
          })} to="/">
            Guest
          </NavLink>
          <NavLink style={({ isActive }) => ({
            color: isActive ? '#fff' : '',
            background: isActive ? '#888' : '',
            pointerEvents: validateUser(loggedInUsers) > 0 ? '' : 'none'
          })} to="/ula">
            ULA
          </NavLink>
          <NavLink style={({ isActive }) => ({
            color: isActive ? '#fff' : '',
            background: isActive ? '#888' : '',
            pointerEvents: validateUser(loggedInUsers) > 1 ? '' : 'none'
          })} to="/admin">
            Admin
          </NavLink>

          <div className="login-zone">
            {!loggedIn ?
              <button className="login-button" onClick={handleLogin}>
                Login
              </button>
              :
              <NavLink className="login-button" to="/" onClick={handleLogout}>
                Logout
              </NavLink>
            }

            <button className="login-button" onClick={handleCreateUser}>
              Create User
            </button>
          </div>
        </ul>
      </nav>

      <div className="main">
        <div className="leftbar">
          <button style={{
            visibility: validateUser(loggedInUsers) > 1 ? '' : 'hidden'
          }} className="admin-button" onClick={handleDelete}>
            Delete
          </button>
          <button style={{
            visibility: validateUser(loggedInUsers) > 1 ? '' : 'hidden'
          }} className="admin-button" onClick={handleAdd}>
            Add
          </button>
        </div>
        <div className="rightbar">

          {/* ----------------------------- sort buttons -------------------------- */}
          <select
            className="input-filter"
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
              <Route path="/ula" element={<InventoryList className="table" data={tableData} user="ula" setEditID={setItemToEdit} />} />
              <Route path="/admin" element={<InventoryList className="table" data={tableData} user="admin" setEditID={setItemToEdit} />} />
            </Routes>
          </div>

          {/* -------------------------------- update ----------------------------- */}
          {itemToEdit.disp ?
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
          <div className="itembox">
            <h2> Statistics Generator</h2>
            <select className="input" onChange={handleTableNameChange} value={tableName} >
              <option value="">Select a table</option>
              {tableNameOptions.map((value) => (
                <option value={value}>
                  {value}
                </option>
              ))}
            </select>

            <select className="input" onChange={handleItemChange} value={selectItem} >
              <option value="">Select a value</option>
              {valueOptions.map((value) => (
                <option value={value}>
                  {value}
                </option>
              ))}
            </select>

            <select className="input" onChange={handleStatChange} value={selectStat} >
              <option value="">Select a value</option>
              {tableName == "consumable" && (
                consumableStatOptions.map((stat) => (
                  <option value={stat}>
                    {stat}
                  </option>
                ))
              )}
              {tableName == "non_consumable" && (
                nonconsumableStatOptions.map((stat) => (
                  <option value={stat}>
                    {stat}
                  </option>
                ))
              )}
              {tableName == "machine" && (
                machineStatOptions.map((stat) => (
                  <option value={stat}>
                    {stat}
                  </option>
                ))
              )}
            </select>

            {/* Submit button with disabled attribute based on conditions */}
            <button onClick={handleButtonClick} disabled={isButtonDisabled}>
              Submit
            </button>

            {isButtonDisabled || Object.keys(changeData).length === 0 ? (
              <p></p>
            ) : (
              <div>
                <h1>Scatter Plot</h1>
                <ScatterPlot data={changeData} stat={selectStat} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}

const validateUser = (users) => {
  try {
    const type = users[0].UserType
    if (type == "ULA")
      return 1
    if (type == "admin")
      return 2
  }
  catch {
  }
  return 0
}

export default App;