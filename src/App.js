import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        {/* Add other routes here */}
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
