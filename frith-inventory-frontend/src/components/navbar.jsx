/*
 * author: Colton Tshudy
 * version: 4/16/2023
 */
import React from 'react';
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Guest</Link>
                </li>
                <li>
                    <Link to="/ula">ULA</Link>
                </li>
                <li>
                    <Link to="/admin">Admin</Link>
                </li>
                {!loggedIn ? (
                    <button className="login-button" onClick={handleLogin}>
                        Login
                    </button>
                ) : null}
            </ul>

            <hr />
        </nav>
    )
}


export default Navbar;
