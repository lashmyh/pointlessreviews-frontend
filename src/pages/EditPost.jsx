import { useState } from "react";
import { isTokenExpired } from "../utils/tokenCheck";
import { useNavigate } from "react-router-dom";
import { editReview } from "../api";
import { Button } from "../components/Button";
import { StarRating } from "../components/StarRating";
export const EditPost = ({ isOpen, onClose, post }) => {

    const [rating, setRating] = useState(post.rating)
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [image, setImage] = useState(null);
    
    const navigate = useNavigate();

    if (!isOpen) return null; // hide modal

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const tokenIsValid = !isTokenExpired(token);

        if (!tokenIsValid) {
            alert("Session timed out. Please log in again to make a post!")
            navigate("/login")
            return;
        }
        
        try {
            const formData = new FormData();
            if (rating !== null) formData.append("rating", rating.toString());
            formData.append("title", title);
            formData.append("description", description);
            if (image) formData.append("image", image);
              
            await editReview(post.id, formData, token);
        

            setRating(null)
            setTitle("");
            setDescription("");
            setImage(null);
            onClose(); //close modal
            window.location.reload();



        } catch (error){
            console.log(error);
        }
        
    };

    return (
        <div className={`fixed inset-0 flex flex-col items-center justify-center bg-black/60 z-50 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"} w-full`}>
            <form onSubmit={handleSubmit} className="bg-bg border-1 border-accent p-7 rounded-3xl flex flex-col w-[90vw] max-w-[40rem]">
                
                <button onClick={() => onClose()} className="hover:scale-125 duration-300 cursor-pointer self-end">x </button>
                <h3 className="text-xl mb-5">Add a new review</h3>
                {/* rating */}
                <span className="flex gap-5">
                    <label htmlFor="rating" className="text-left mb-2">Rating:</label>
                    <StarRating rating={rating} setRating={setRating}></StarRating>
                </span>
                {/* title */}
                <textarea className="bg-med-purple/30 rounded-xl p-3 mb-5 h-15"
                    placeholder="Title*"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                {/* description */}
                <textarea className="bg-med-purple/30 rounded-xl p-3 mb-5 h-30"
                    placeholder="add a description*"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                {/* upload image */}
                <input className=" mb-5 border-1 rounded-md p-2"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <Button text="Update" type="submit" colour="bg-accent" textColour="text-dark-purple"></Button>
            </form>
        </div>
    )
}
