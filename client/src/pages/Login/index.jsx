import React, {useState} from "react";
import "./styles.css";
import Input from "../../components/Input";
import axios from "axios";
import AnimatedIntro from "../../components/AnimatedIntro";
import Parchment from "../../components/Parchment";

function Login() {

    const [authenticated, setauthenticated] = useState(
        localStorage.getItem(localStorage.getItem("authenticated") || false)
    );

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const handleDataChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };
    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:3001/auth/login",
                credentials,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response)
            if (response.status === 200) {
                const responseData = response?.data;
                if (responseData) {
                    setauthenticated(true)
                    localStorage.setItem("authenticated", true);
                    localStorage.setItem("user", JSON.stringify(responseData));
                    window.location.reload(false);
                }
            }
        } catch (error) {
            console.log('error')
            console.error("Login error:", error);
        }
    };
    return (
        <div className="container">
            <div>
                <AnimatedIntro/>
            </div>
            <div className="login-box">
                <Parchment/>
                <h2 className="login-heading">Login</h2>
                <Input
                    label="Email:"
                    placeholder="Enter your email"
                    value={credentials.email}
                    onChange={handleDataChange}
                    name="email"
                    type="text"
                />
                <Input
                    label="Password:"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={handleDataChange}
                    name="password"
                    type="password"
                />
                <p>Don't Have an account? <a href="/register" className="register-here">Register here!</a></p>
                <button className="login-btn" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;
