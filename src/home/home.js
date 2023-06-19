import React from 'react';
import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome to the Home Page!</h1>
            <button type="button" onClick={() => navigate("/login")} className="login">
                Login
            </button>
        </div>
    )
}

export default Home;