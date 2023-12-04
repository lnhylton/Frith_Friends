/*
 * author: Colton Tshudy
 * version: 4/16/2023
 */
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import React from 'react';
import "../style/table.css"

const InventoryList = (props) => {
    // Default props
    const {
        data,
        className,
        user,
        setEditID
    } = props;

    const handler = (params) => {
        for (const [key, value] of Object.entries(params.row)) {
            if (key.indexOf("c_id") > -1 || key.indexOf("nc_id") > -1 || key.indexOf("m_id") > -1) {
                setEditID({id: value, disp: true})  
                return;
            }
        }
    }

    const renderEditButton = (params) => {
        return (
            <button className="button" onClick={() => handler(params)}>
                Edit
            </button>
        )
    }

    // Convert dictionary to an array of objects
    const rows = Object.entries(data).map(([id, rowData]) => ({ id, ...rowData }));

    // Define columns based on the keys of the first object in the dictionary
    const cols = Object.keys(rows[0] || {}).map((key) => {
        // Exclude the 'id' column
        if (key.indexOf('id') < 0 || user == "admin") {
            return {
                field: key,
                headerName: key,
                flex: 1,
                renderCell: (params) => {
                    // Check if param.value is a link
                    if (isLink(params.value)) {
                        return <a href={params.value} target="_blank" rel="noopener noreferrer">{params.value}</a>;
                    }
                    // Default rendering if not a link
                    return params.value;
                },
            };
        }
        return null;
    }).filter(Boolean);

    // Put "Name" column first
    var rearrangedCols = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
        },
        ...cols.filter((col) => col.field !== 'name'),
    ];

    if (user && (user == "admin" || user == "ula")) {
        rearrangedCols.push({
            field: "edit",
            headerName: "edit",
            flex: 1,
            renderCell: renderEditButton,
            disableClickEventBubbling: true,
        })
    }

    return (
        <Box className={className}>
            <DataGrid
                columns={rearrangedCols}
                rows={rows}
                initialState={{
                    ...data.initialState,
                    pagination: { paginationModel: { pageSize: 100 } },
                }}
                pageSizeOptions={[10, 25, 100]}
            />
        </Box>
    )
}

// Function to check if a value is a link
const isLink = (value) => {
    return typeof value === 'string' && value.startsWith('http');
};


export default InventoryList;