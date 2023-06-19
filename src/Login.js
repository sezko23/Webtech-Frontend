import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/login', {
                username,
                password,
            });

            if (response.data) {
                login(response.data.token);
                navigate('/dashboard');
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Login error', error);
            if (error.response) {
                alert(`Login error: ${error.response.data.error}`);
            } else if (error.request) {
                alert('Login error: No response from server');
            } else {
                alert(`Login error: ${error.message}`);
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
                        type="username"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
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
                        required
                    />
                </label>
            </div>

            <button type="submit" className="sign-in" onClick={handleSubmit}>
                LOG IN
            </button>
            <br />
            <div className="line-horizontal"></div>
            <p id="no-account">Don't have an account?</p>
            <button type="button" onClick={() => navigate('/register')} className="sign-up">
                SIGN UP
            </button>
        </div>
    );
};

export default Login;
