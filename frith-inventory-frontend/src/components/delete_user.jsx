import React, { useState } from 'react';

const BACKEND_PORT = 5001;

const DeleteUserForm = ({ onDelete, onBack }) => {
    const [deleteUsername, setDeleteUsername] = useState('');
    const [deleteUserResult, setLatestResponseDeleteUser] = useState('');

    const handleDeleteUsernameChange = (event) => {
        setDeleteUsername(event.target.value);
    };

    const handleDeleteUser = () => {
        fetch(`http://localhost:${BACKEND_PORT}/delete_user`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                username: deleteUsername,
            }),
        })
            .then((response) => response.json())
            .then((res) => {
                setLatestResponseDeleteUser(res.message);
                console.log(res);
                onDelete();
            })
            .catch((e) => {
                setLatestResponseDeleteUser("failed");
            });
    };

    const handleBack = () => {
        onBack();
    };

    return (
        <div className="App">
            <div className="itembox">
                <h2>Delete User</h2>
                <div key="delete_username" className="data-box">
                    <label className="data-label">Username:</label>
                    <input
                        type="text"
                        className="input data-value"
                        value={deleteUsername}
                        onChange={handleDeleteUsernameChange}
                    />
                </div>
                <button onClick={handleDeleteUser}>Delete User</button>
                <button onClick={handleBack}>Back</button>
                {deleteUserResult && <p>{deleteUserResult}</p>}
            </div>
        </div>
    );
};

export default DeleteUserForm;
