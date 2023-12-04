/*
 * author: Colton Tshudy
 * version: 4/16/2023
 */
import React from 'react';
import GuestList from '../components/guest_user_list';
import data from '../testdata/data.json'

const Guest = () => {
    return (
        <>
            <div>
                Guest
                <GuestList data={data} />
            </div>
        </>
    )
}


export default Guest;