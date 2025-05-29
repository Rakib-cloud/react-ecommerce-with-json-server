import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if username already exists
        const resCheck = await fetch(`http://localhost:5000/users?username=${username}`);
        const existingUser = await resCheck.json();
        if (existingUser.length > 0) {
            setError("Username already exists");
            return;
        }

        // Register new user with role user
        const res = await fetch(`http://localhost:5000/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, role: "user", cart: [] }),
        });

        if (res.ok) {
            alert("User registered successfully! Please login.");
            navigate("/login");
        } else {
            setError("Registration failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
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
                    Register
                </button>
            </form>

            <div className="mt-4 text-center">
                <Link to="/" className="text-blue-600 hover:underline block">
                    Go back to Home Page
                </Link>
                <Link to="/login" className="text-blue-600 hover:underline block mt-2">
                    Already have an account? Login here
                </Link>
            </div>
        </div>

    );
};

export default Register;
