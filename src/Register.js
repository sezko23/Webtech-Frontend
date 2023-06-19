import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleRegisterClick = async () => {
        const emailValidator = /^[^@]+@[^@]+\.[^.]+$/;

        if (username.length < 3) {
            setErrorMessage('Username must be at least 3 symbols!');
            setSuccessMessage('');
            return;
        }

        if (!email.match(emailValidator)) {
            setErrorMessage('Invalid email!');
            setSuccessMessage('');
            return;
        }

        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 symbols!');
            setSuccessMessage('');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            setSuccessMessage('');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/register', {
                username,
                email,
                password,
                confirm_password: confirmPassword,
            });

            if (response.data.message) {
                setSuccessMessage(response.data.message);
                setErrorMessage('');

                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setErrorMessage('Registration failed');
            }
        } catch (error) {
            console.error('Registration error', error);
            if (error.response) {
                console.error('Registration error response', error.response);
                console.error('Registration error data', error.response.data);
                console.error('Registration error status', error.response.status);
                alert(`Registration error: ${error.response.data.error}`);
            } else if (error.request) {
                console.error('Registration error request', error.request);
                alert('Registration error: No response from server');
            } else {
                console.error('Registration error message', error.message);
                alert(`Registration error: ${error.message}`);
            }
        }
    };


    return (
        <div className="main-page">
            <div className="user-input">
                <label htmlFor="username">
                    <img src="https://imageshack.com/i/pmoR8X3cp" alt="User Icon" className="user-icon" />
                    <div className="line"></div>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
            </div>
            <div className="user-input">
                <label htmlFor="email">
                    <img src="https://imageshack.com/i/po92oMvKp" alt="User Icon" className="user-icon" />
                    <div className="line"></div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
            </div>
            <div className="password-input">
                <label htmlFor="password">
                    <img src="https://imageshack.com/i/potCzWpwp" alt="Lock Icon" className="lock-icon" />
                    <div className="line"></div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
            </div>
            <div className="password-input">
                <label htmlFor="confirm-password">
                    <img src="https://imageshack.com/i/potCzWpwp" alt="Lock Icon" className="lock-icon" />
                    <div className="line"></div>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <button type="button" className="sign-in" onClick={handleRegisterClick}>
                REGISTER
            </button>
            <br />
            <div className="line-horizontal"></div>
            <button type="button" onClick={() => navigate('/login')} className="sign-up">
                BACK
            </button>
        </div>
    );
};

export default Register;
