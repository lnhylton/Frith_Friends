/*
 * author: Colton Tshudy
 * version: 4/16/2023
 */
import React from 'react';
import InventoryList from '../components/data_list';
import '../style/guest.css'

const Guest = (data) => {
    return (
        <>
            <div className="guest">
                <InventoryList data={data} className="table"/>
            </div>
        </>
    )
}


export default Guest;