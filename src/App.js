import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import Home from "./home/home";
import Error from "./error/error";

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path='/' element={<Home />} />
                        <Route path='*' element={<Error />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;