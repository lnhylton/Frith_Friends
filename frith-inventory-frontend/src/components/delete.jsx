import React, { useState } from 'react';
import "../App.css"

const BACKEND_PORT = 5001;

const DeleteForm = ({ onBack }) => {
  const [itemIdDelete, setItemDelete] = useState("");
  const [tableNameDelete, setTableNameDelete] = useState("consumable"); // Default value
  const [latestResponseDelete, setLatestResponseDelete] = useState("");

  const handleItemIdDeleteChange = (event) => {
    setItemDelete(event.target.value);
  };

  const handleTableNameChangeDelete = (event) => {
    setTableNameDelete(event.target.value);
  };

  const handleDeleteSubmit = () => {
    console.log(itemIdDelete)
    // Perform your API call here to submit the updated data
    fetch(`http://localhost:${BACKEND_PORT}/delete`, {
      method: "DELETE",
      body: JSON.stringify({
        tableName: tableNameDelete,
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

  const handleBack = () => {
    onBack();
  };

  return (
      <div className="itembox">
        <h2>This will delete an item from the selected table:</h2>
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
        <button onClick={handleBack}>Back</button>

        <label className="query-status">
          {latestResponseDelete}
        </label>
      </div>
  );
};

export default DeleteForm;
