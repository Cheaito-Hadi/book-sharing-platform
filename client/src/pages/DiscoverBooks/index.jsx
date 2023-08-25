import React, {useEffect, useState} from 'react';
import './styles.css';
import axios from 'axios';
import BookCard from "../../components/BookCard";

function DiscoverBooks(){
    const userId = JSON.parse(localStorage.getItem("user")) || null;
    axios.defaults.headers.common["Authorization"] = `Bearer ${userId.token}`;
    const url = 'http://127.0.0.1:3001';
    const [allBookData, setAllBookData] = useState([]);
    const [originalBookData, setOriginalBookData] = useState([]);
    const [isMatch, setIsMatch] = useState(false);
    const [search, setSearch] = useState("");


    const handleSearchText = (text) => {
        setSearch(text);
    };

    const handleSearch = async () => {
        if (search !== "") {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:3001/search/?query=${search}`
                );
                if (response.data.message === "success") {
                    const postSearch = response.data.data;
                    setAllBookData(postSearch);
                    setIsMatch(true);
                } else {
                    setIsMatch(false);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setAllBookData(originalBookData);
            setIsMatch(true);
        }
    };

    useEffect(() => {
        async function fetchAllBookData() {
            try {
                const response = await axios.get(url + '/share/get_all_posts', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 200) {
                    setAllBookData(response.data.data);
                    // setOriginalBookData(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        }

        fetchAllBookData();
    }, []);
    useEffect(() => {
        handleSearch();
    }, [search]);

    return (
        <div className="discover-container-page">
        <h2>Books recommended by Others:</h2>
            <input
                type="search"
                name="search"
                id="search"
                placeholder="Search"
                className="search-input"
                onChange={(e) => handleSearchText(e.target.value)}
            />
        <div className="discover-container">
            {allBookData.map((book, index) => (
                <BookCard key={index} book={book} />
            ))}
        </div>
        </div>
    );

}

export default DiscoverBooks;
