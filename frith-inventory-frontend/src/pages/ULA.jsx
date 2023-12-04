/*
 * author: Colton Tshudy
 * version: 4/16/2023
 */
import React from 'react';
import InventoryList from '../components/data_list';
import '../style/guest.css'

const ULA = (data) => {
    return (
        <>
            <div className="guest">
                <InventoryList className="table" data={data} user="ula"/>
            </div>
        </>
    )
}


export default ULA;