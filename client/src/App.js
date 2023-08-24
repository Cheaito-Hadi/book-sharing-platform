import './App.css';
import {Route, Routes} from "react-router";
import {useEffect, useState} from "react";
import Login from "./pages/Login";

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
            </Routes>
        );
    }

}

export default App;
