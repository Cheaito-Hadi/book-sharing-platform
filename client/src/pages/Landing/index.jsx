    import React, {useEffect, useState} from 'react';
    import './styles.css';
    import axios from 'axios';
import BookCard from "../../components/BookCard";
import BookModal from "../../components/BookModal";

function Landing() {
    const url = 'http://127.0.0.1:3001';
    const userId = JSON.parse(localStorage.getItem("user")) || null;
    const [bookData, setBookData] = useState([]);
    const [followedBookData, setFollowedBookData] = useState([]);
    const [allBookData, setAllBookData] = useState([]);
    const [originalBookData, setOriginalBookData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMatch, setIsMatch] = useState(false);
    const [search, setSearch] = useState("");
    axios.defaults.headers.common["Authorization"] = `Bearer ${userId.token}`;

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
        async function fetchBookData() {
            try {
                const response = await axios.get(url + '/share/get_posts/' + userId.user._id,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                if (response.status === 200) {
                    setBookData(response.data.userPosts);
                    setFollowedBookData(response.data.followedPosts);
                }
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        }

        fetchBookData();
    }, [userId.user._id]);

    useEffect(() => {
        handleSearch();
    }, [search]);

    return (
        <div className="landing-container">
            <div className="modal-create-main">
                <button onClick={openModal}>Create a Book</button>
            </div>
            {isModalOpen && (
                <BookModal closeModal={closeModal}/>
            )}
            <input
                type="search"
                name="search"
                id="search"
                placeholder="Search"
                className="search-input"
                onChange={(e) => handleSearchText(e.target.value)}
            />
            <h2>Your Books</h2>
            <div className="book-container">
                {bookData.map((book) => (
                    <BookCard key={book.post._id} book={book}/>
                ))}
            </div>
            <h2>Followed Books</h2>
            <div className="book-container">
                {followedBookData.map((book) => (
                    <BookCard key={book.post._id} book={book}/>
                ))}
            </div>
        </div>
    );
}

export default Landing;
