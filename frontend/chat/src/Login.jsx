import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };
    React.useEffect(() => {
        const access = localStorage.getItem("access");
        const user = localStorage.getItem("user");
        if (access && user) {
            navigate("/RoomList");
        }
    }, [navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await axios.post("https://backend-production-5b2b.up.railway.app/api/accounts/login/", form);

            if (res.status !== 200) {
                throw new Error("Login failed");
            }

            const { access, refresh, user } = res.data;


            localStorage.setItem("access", access);
            localStorage.setItem("refresh", refresh);
            localStorage.setItem("user", JSON.stringify(user));

            alert("Login successful!");
            navigate("/RoomList");

        } catch (err) {
            console.error("Login error:", err);
            if (err.response?.data) {
                setError(err.response.data?.detail || JSON.stringify(err.response.data));
            } else {
                setError("Login failed!");
            }
        }
    };

    return (
        <div className="container mt-8">
            <h2 className="mb-4">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => navigate("/Register")}
                >
                    Register
                </button>
            </form>

        </div>
    );
}

export default Login;
