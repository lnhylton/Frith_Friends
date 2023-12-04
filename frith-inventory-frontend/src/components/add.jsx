import React, { useState } from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const BACKEND_PORT = 5001;

const AddForm = ({ onBack }) => {
    const [latestResponseAdd, setLatestResponseAdd] = useState("");
    const [tableNameAdd, setTableNameAdd] = useState("consumable"); // Default value
    const [retrievedDataAdd, setRetrievedDataAdd] = useState(null); // Store retrieved data
    const [editedDataAdd, setEditedDataAdd] = useState({});

    const handleTableNameChangeAdd = (event) => {
        setTableNameAdd(event.target.value);
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

    const handleBack = () => {
        onBack();
    };

    return (
        <div className="App">
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
            <button onClick={handleBack}>Back</button>


            <label className="query-status">
              {latestResponseAdd}
            </label>
          </div>
        </div>
    );
};

export default AddForm;
