import React, {useState} from "react";
import "./styles.css";
import axios from 'axios';

function CreateRecipeModal({closeModal}) {
    let userId = JSON.parse(localStorage.getItem("user")) || null;
    const [imageUpload, setImageUpload] = useState();
    const [selectedImage, setSelectedImage] = useState(null);
    axios.defaults.headers.common["Authorization"] = `Bearer ${userId.token}`;
    const [data, setData] = useState({
        userId: userId.user._id,
        title: "",
        author: "",
        review: "",
        genre: "",
        pic_url: null,
    });

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };
    const handleImageChange = (e) => {
        setImageUpload(e.target.files[0]);
        setSelectedImage(e.target.files[0]);
    };


    const handleCreateClick = async () => {
        await uploadImage();
        try {
            const response = await axios.post('http://127.0.0.1:3001/share/share_book',
                {
                    userId: userId.user._id,
                    title: data.title,
                    author: data.author,
                    review: data.review,
                    genre: data.genre,
                    pic_url: selectedImage ? await uploadImage() : ""
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
            if (response.data.message === "Book post added successfully") {
                console.log('Response from server:', response.data);
                closeModal();
                window.location.reload(false);
            }
        } catch (error) {
            console.error('Error sending data to the server:', error);
        }
    };

    const uploadImage = async () => {
        if (selectedImage) {
            const formData = new FormData();
            formData.append("file", selectedImage);
            try {
                const response = await axios.post(
                    "http://127.0.0.1:3001/uploadImage", formData
                );
                // setData({...data, pic_url: filename});
                return response.data.filename;
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (<div className="modal-overlay">
        <div className="modal-content">
            <label>Book Name:</label>
            <input className="input-main" placeholder="Book name"
                   name="title" value={data.title} onChange={handleChange}
                   type="text"/>

            <label>Book Author:</label>
            <input className="input-main" placeholder="Book author" name="author" value={data.author}
                   onChange={handleChange}
                   type="text"/>
            <label>Book Review:</label>
            <textarea className="input-main" placeholder="Book Review" name="review" value={data.review}
                      onChange={handleChange}
            />
            <label>Book Genre:</label>
            <input className="input-main" placeholder="Book Genre" name="genre" value={data.genre}
                   onChange={handleChange}
                   type="text"/>
            <div className="brr">

            </div>
            <div className="modal-img-container">
                <input
                    className="add-image-btn"
                    id="image"
                    name="file"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}/>
                <label htmlFor="image" className="image-upload-label">
                    Upload Image
                </label>
            </div>
            <button className="send-button" onClick={handleCreateClick}>
                Share Book
            </button>
            <button className="modal-close-button" onClick={closeModal}>
                Close
            </button>
        </div>
    </div>);
}

export default CreateRecipeModal;