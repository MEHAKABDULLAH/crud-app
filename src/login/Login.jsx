import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // useNavigate hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://backend-iota-tan-15.vercel.app/api/auth/login", { email, password });
            const token = response.data.token; // ✅ Extract token from response
            localStorage.setItem("token", token); // ✅ Store token in localStorage
            alert("🎉 Login successful!");
            navigate("/home"); // Navigate to home or dashboard after login
        } catch (err) {
            setError("⚠️ Invalid credentials");
        }
    };

    return (
        <div>
            <h2><em>Login</em></h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <p>If you have no account <Link to={'/signup'}>Create one</Link></p>
            </form>
        </div>
    );
}

export default Login;
