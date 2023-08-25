import React, {useEffect, useState} from 'react';
import './styles.css';
import axios from 'axios';
import BookCard from "../../components/BookCard";

function DiscoverBooks(){
    const userId = JSON.parse(localStorage.getItem("user")) || null;
    axios.defaults.headers.common["Authorization"] = `Bearer ${userId.token}`;
    const url = 'http://127.0.0.1:3001';
    const [allBookData, setAllBookData] = useState([]);
    // const [originalBookData, setOriginalBookData] = useState([]);

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

    return (
        <>
        <h2>Books recommended by Others:</h2>
        <div className="discover-container">
            {allBookData.map((book, index) => (
                <BookCard key={index} book={book} />
            ))}
        </div>
        </>
    );

}

export default DiscoverBooks;
