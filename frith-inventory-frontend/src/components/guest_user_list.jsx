/*
 * author: Colton Tshudy
 * version: 4/16/2023
 */
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import React from 'react';

const InventoryList = (props) => {
    // Default props
    const {
        data,
        className,
        onClick
    } = props;

    const customToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        )
    }

    const rows = data

    const cols = [
        { field: 'id', headerName: "ID", width: 50 },
        { field: 'Week', headerName: "Week", width: 120 },
        { field: 'javascript', headerName: "Javascript", width: 100 },
        { field: 'python', headerName: 'Python', width: 100 },
        { field: 'java', headerName: 'Java', width: 100 },
    ]

    return (
        <>
            <Box className={className}>
                <DataGrid columns={cols} rows={rows}
                    checkboxSelection
                    slots={
                        { toolbar: customToolbar() }
                    }
                />
            </Box>
        </>
    )
}


export default InventoryList;