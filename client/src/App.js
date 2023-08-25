import './App.css';
import {Route, Routes} from "react-router";
import {useEffect, useState} from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";

function App() {
    const [authenticated, setauthenticated] = useState(null);
    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
            setauthenticated(loggedInUser);
        }
    }, []);
    if (!authenticated) {
        return (
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        );
    }
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Landing/>}/>
            </Routes>
        </div>
    );

}

export default App;
