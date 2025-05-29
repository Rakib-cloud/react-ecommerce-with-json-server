import React, { useState, useContext } from "react";

import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // fetch users from JSON server
        const res = await fetch(`http://localhost:5000/users?username=${username}&password=${password}`);
        const data = await res.json();

        if (data.length > 0) {
            login(data[0]);
            if (data[0].role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/user");
            }
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    className="border p-2 mb-4 w-full"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    className="border p-2 mb-4 w-full"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="bg-green-600 text-white py-2 px-4 rounded w-full" type="submit">
                    Login
                </button>
            </form>

            <div className="mt-4 text-center">
                <Link to="/" className="text-blue-600 hover:underline block">
                    Go back to Home Page
                </Link>
                <Link to="/register" className="text-blue-600 hover:underline block mt-2">
                    Don’t have an account? Register here
                </Link>
            </div>
        </div>


    );
};

export default Login;
