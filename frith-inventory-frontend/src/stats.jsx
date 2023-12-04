import React, { useState } from 'react';
import LoginForm from './login'; // Assuming the login file is in the same directory
import FrithLogo from './components/frith_logo.jsx'

const BACKEND_PORT = 5001;

const StatPage = () => {
    const [tableNameOptions] = useState(["consumable", "consumable_location", "machine"]);
    const [tableName, setTableName] = useState("consumable");
    const [valueOptions, setValueOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
  
    const handleTableNameChange = (event) => {
        const selectedTableName = event.target.value;
        if (!selectedTableName){
            setValueOptions([]);
        }
        setTableName(selectedTableName);
        // Fetch values based on the selected table name
        // This is a hypothetical function, you need to replace it with your actual HTTP GET request
        //fetchData(selectedTableName);
    };

    const handleValueChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedValue(selectedValue);
    };

    useEffect(() => {
        // Fetch initial data when the component mounts
        if (tableName) {
            //fetchData(tableName);
        }
    }, [tableName]);

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
    /*                                    HTML                                    */
    /* -------------------------------------------------------------------------- */
  
    return (
      
    <div className="Stat">
        {/* -------------------------------- statistics -------------------------------- */}
        <div className="itembox">
            {/* Select table in the database */}
            <h2> Statistics Generator</h2>
            <select className="input" onChange={handleTableNameChange} value={tableName} >
                <option value="">Select a table</option>
                {tableNameOptions.map((value) => (
                <option value={value}>
                    {value}
                </option>
                ))}
            </select>

            {/* Second item name in the table*/}
            <select className="input" onChange={handleValueChange} value={selectItem} >
                <option value="">Select a value</option>
                {valueOptions.map((value) => (
                <option value={value}>
                    {value}
                </option>
                ))}
            </select>
        </div>
    </div>
    );
  }
  
  export default StatPage;