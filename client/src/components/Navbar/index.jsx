import React, {useEffect, useState} from 'react'
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faFeed,faFileArchive } from '@fortawesome/free-solid-svg-icons';
import {useLocation} from "react-router";
import Logo from '../../assets/logoBook.svg'

function Navbar() {
    const location = useLocation();
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
            <img src={Logo} alt="image" className="image-logo"/>
            <ul>
                <a href="/" className={(url === "/" ?" active" : "")}><FontAwesomeIcon icon={faFeed} />Feeds</a>
                <a href="/discover-books" className={(url === "/discover-books" ?" active" : "")}><FontAwesomeIcon  icon={faFileArchive}/>Discover new Books</a>
                <a href="/" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} />Logout</a>
            </ul>
        </nav>
    )
}

export default Navbar