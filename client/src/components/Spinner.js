import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'




function Spinner({ path = "login" }) {

    const navigate = useNavigate();
    const [counter, setCounter] = useState(2);
    const location = useLocation();

    useEffect(() => {
        const decreament = () => {
            setCounter((prev) => --prev);
            console.log("Hello");
        }
        const interval = setInterval(decreament, 1000);
        if (counter === 0) {
            navigate(`/${path}`, {
                state: location.pathname
            });
        }

        return () => clearInterval(interval);

    }, [counter, navigate, location, path])
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div>
                Redirecting you to Login Page within {counter} seconds
            </div>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>

    )
}

export default Spinner
