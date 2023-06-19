import React from 'react';
import {useNavigate} from "react-router-dom";

function Error() {
    const navigate = useNavigate();
    return (
        <div>
            <p id="error-msg">Oops, an Error occurred</p>
            <button type="button" onClick={() => navigate("/")} className="back">Back</button>
        </div>
    );
}

export default Error;