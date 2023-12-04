import React, { useState } from 'react';

const BACKEND_PORT = 5001;

const CreateUserForm = ({ onCreate, onBack }) => {
    const [createUsername, setCreateUsername] = useState('');
    const [createOriginalPassword, setCreateOrgPassword] = useState('');
    const [createConfirmPassword, setCreateConfirmPassword] = useState('');
    const [createPasswordVisible, setCreatePasswordVisible] = useState(false);
    const [createAccountType, setCreateAccountType] = useState('ULA');
    const [createUserResult, setLatestResponseCreateUser] = useState('');

    const handleCreateUsernameChange = (event) => {
        setCreateUsername(event.target.value);
    };

    const handleCreateOriginalPasswordChange = (event) => {
        setCreateOrgPassword(event.target.value);
    };

    const handleCreateConfirmPasswordChange = (event) => {
        setCreateConfirmPassword(event.target.value);
    };

    const handleCreateAccountTypeChange = (event) => {
        setCreateAccountType(event.target.value);
    };

    const handleCreatePasswordVisibleChange = (event) => {
        setCreatePasswordVisible(!createPasswordVisible);
    };

    const handleCreateUser = () => {
        fetch(`http://localhost:${BACKEND_PORT}/create_user`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                username: createUsername,
                original_password: createOriginalPassword,
                confirm_password: createConfirmPassword,
                account_type: createAccountType,
            }),
        })
            .then((response) => response.json())
            .then((res) => {
                setLatestResponseCreateUser(res.message);
                console.log(res);
                onCreate();
            })
            .catch((e) => {
                setLatestResponseCreateUser("failed");
            });
    };

    const handleBack = () => {
        onBack();
    };

    return (
        <div className="App">
            <div className="itembox">
                <h2>Create User</h2>
                <div key="create_username" className="data-box">
                    <label className="data-label">Username:</label>
                    <input
                        type="text"
                        className="input data-value"
                        value={createUsername}
                        onChange={handleCreateUsernameChange}
                    />
                </div>
                <div key="create_password" className="data-box">
                    <label className="data-label">Password:</label>
                    <input
                        type={createPasswordVisible ? 'text' : 'password'}
                        className="input data-value"
                        value={createOriginalPassword}
                        onChange={handleCreateOriginalPasswordChange}
                    />
                </div>
                <div key="create_confirm_password" className="data-box">
                    <label className="data-label">Confirm Password:</label>
                    <input
                        type={createPasswordVisible ? 'text' : 'password'}
                        className="input data-value"
                        value={createConfirmPassword}
                        onChange={handleCreateConfirmPasswordChange}
                    />
                </div>
                <div key="create_account_type" className="data-box">
                    <label className="data-label">Account Type:</label>
                    <select
                        className="input"
                        onChange={handleCreateAccountTypeChange}
                        value={createAccountType}
                    >
                        <option value="ULA">ULA</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <div key="create_password_visible" className="data-box">
                    <label className="data-label">
                        Show Password
                        <input
                            type="checkbox"
                            onChange={handleCreatePasswordVisibleChange}
                        />
                    </label>
                </div>
                <button onClick={handleCreateUser}>Create User</button>
                <button onClick={handleBack}>Back</button>
                {createUserResult && <p>{createUserResult}</p>}
            </div>
        </div>
    );
};

export default CreateUserForm;
