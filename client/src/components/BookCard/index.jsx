import React, {useEffect, useState} from "react";
import {AiFillHeart} from "react-icons/ai";
import "./styles.css";
import axios from "axios";
// import { FaRegUser, FaUserMinus } from "react-icons/fa";

function BookCard({book}) {
    let userId = JSON.parse(localStorage.getItem("user")) || null;
    const [like, setLike] = useState(book.post.likes.length > 0);
    const [likesCount, setLikesCount] = useState(book.post.likes.length);
    const [userfollow, setUserfollow] = useState(false);

    const url = "http://127.0.0.1:3001";

    const handleLikes = async () => {
        try {
            const data = new FormData();
            data.append("user_id", userId.user._id);
            data.append("postId", book.post._id);
            await axios.post(
                `${url}${like ? "/like/unlike" : "/like/like"}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
    };
    const likeHandler = () => {
        handleLikes();
        setLike(!like);
        setLikesCount(!like ? likesCount + 1 : likesCount - 1);
    };
    const isfollow = async () => {
        try {
            const res = await axios.get(
                `http://127.0.0.1:3001/user/?followerId=${userId.user._id}&followingId=${book.user.userId}`
            );
            if (res.data.isFollowing) {
                setUserfollow(true);
            } else {
                setUserfollow(false);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleFollow = async () => {
        const data = new FormData();
        data.append("followerId", userId.user._id);
        data.append("followingId", book.user.userId);
        try {
            if (!userfollow) {
                await axios.post(`http://127.0.0.1:3001/user/follow`, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setUserfollow(true);
            } else {
                await axios.post(`http://127.0.0.1:3001/user/unfollow/`, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setUserfollow(false);
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        isfollow();
    }, []);
    return (
        <div className="card-container">
            <div>
                <div className="title-container">

                    <h2 className="title-recipe-name">{book.post.title}</h2>
                    <div className="follow-like">
                        <div>
                            {userId.user._id !== book.userId && (
                                <button
                                    className={`follow-button ${userfollow ? "followed" : ""}`}
                                    onClick={() => {
                                        handleFollow();
                                    }}
                                >
                                    {userfollow ? "Unfollow" : "Follow"}
                                </button>
                            )}
                        </div>
                        <div
                            className={`icon-container ${userId.user._id === book.user.userId ? "pointer-disable" : ""}`}>
                            <AiFillHeart
                                className={`icon ${like ? "icon-liked" : "icon-unliked"}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    likeHandler();
                                }}
                            />
                            <span className="icon-text">{likesCount}</span>
                        </div>
                    </div>

                </div>
                <div className="img-container-carousel">
                    <img className="img-carousel" src={'../uploads/images/' + book.post.pic_url} alt="Imag"/>
                </div>
                <div className="container-card-wrap">
                    <div className="d-flex items-center">
                        <h4 className="cuisine-ing">Author: </h4> <span>{book.post.author}</span>
                    </div>
                    <div className="d-flex items-center">
                        <h4 className="cuisine-ing">Review: </h4> <span>{book.post.review}</span>
                    </div>
                    Posted by: {book.user.firstName} {book.user.lastName}
                </div>

            </div>
        </div>
    );
}

export default BookCard;
