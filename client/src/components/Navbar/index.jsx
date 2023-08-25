import React, {useEffect, useState} from 'react'
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faBowlFood,faStickyNote } from '@fortawesome/free-solid-svg-icons';
import {useLocation} from "react-router";

function Navbar() {
    const location = useLocation(); // once ready it returns the 'window.location' object
    const [url, setUrl] = useState(null);
    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);
    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('authenticated')
        window.location = '/';
    }

    return (
        <nav className="navbar">
            {/*<img src={Logo} alt="image" className="image-logo"/>*/}
            <ul>
                <a href="/" className={(url === "/" ?" active" : "")}><FontAwesomeIcon icon={faBowlFood} />Feeds</a>
                <a href="/discover-books" className={(url === "/discover-books" ?" active" : "")}><FontAwesomeIcon  icon={faStickyNote}/>Discover new Books</a>
                <a href="/" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} />Logout</a>
            </ul>
        </nav>
    )
}

export default Navbar