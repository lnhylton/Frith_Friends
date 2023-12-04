/*
 * author: Colton Tshudy
 * version: 4/16/2023
 */
import React from 'react';
import InventoryList from '../components/data_list';
import '../style/guest.css'

const Admin = (data) => {
    return (
        <>
            <div className="guest">
                <InventoryList className="table" data={data} user="admin"/>
            </div>
        </>
    )
}


export default Admin;