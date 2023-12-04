import React, { useState } from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const BACKEND_PORT = 5001;

const LoginForm = ({ onLogin, onBack }) => {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
    const [loginResult, setLatestResponseLogin] = useState('');

    const handleLoginUsernameChange = (event) => {
        setLoginUsername(event.target.value);
    };

    const handleLoginPasswordChange = (event) => {
        setLoginPassword(event.target.value);
    };

    const handleLoginPasswordVisibleChange = (event) => {
        setLoginPasswordVisible(!loginPasswordVisible);
    };

    const handleLogin = () => {
        fetch(`http://localhost:${BACKEND_PORT}/login`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                username: loginUsername,
                password: loginPassword,
            }),
        })
            .then((response) => response.json())
            .then((res) => {
                //setLatestResponseLogin(res.message);
                console.log(res);
                if (res.status === 'success') {
                    // Notify the parent component about the successful login
                    onLogin();
                }
            })
            .catch((e) => {
                setLatestResponseLogin("failed");
            });
    };

    const handleBack = () => {
        onBack();
    };

    return (
        <div className="App">
            <div className="itembox">
                <h2>Login</h2>
                <div key="login_username" className="data-box">
                    <label className="data-label">Username:</label>
                    <input
                        type="text"
                        className="input data-value"
                        value={loginUsername}
                        onChange={handleLoginUsernameChange}
                    />
                </div>
                <div key="login_password" className="data-box">
                    <label className="data-label">Password:</label>
                    <input
                        type={loginPasswordVisible ? 'text' : 'password'}
                        className="input data-value"
                        value={loginPassword}
                        onChange={handleLoginPasswordChange}
                    />
                </div>
                <div key="login_password_visible" className="data-box">
                    <label className="data-label">
                        Show Password
                        <input
                            type="checkbox"
                            onChange={handleLoginPasswordVisibleChange}
                        />
                    </label>
                </div>
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleBack}>Back</button>
                {loginResult && <p>{loginResult}</p>}
            </div>
        </div>
    );
};

export default LoginForm;
