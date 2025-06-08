import { useParams, useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/tokenCheck";
import { useState, useEffect } from "react";
import { fetchPost } from "../api";
import { formatDate } from "../utils/formatDate";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/Button";
import { ConfirmDialog } from "../components/ConfirmDialog";

import { deleteReview } from "../api";

import tomato from "../assets/tomato.svg"
import neutral from "../assets/neutral.svg"
import heart from "../assets/heart.svg"
import star from "../assets/star.svg"
import { EditPost } from "./EditPost";


export const SinglePost = () => {

    const navigate = useNavigate();
    const { postId } = useParams(); // get userId from URL
    const [ post, setPost ] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);//update post
    const [isDialogOpen, setIsDialogOpen] = useState(false); //confirm delete

    const token = localStorage.getItem("token");
    const tokenIsValid = !isTokenExpired(token);

    useEffect(() => {
        const getPost = async () => {
            if (tokenIsValid) {
                try {
                    const response = await fetchPost(postId, token);
                    setPost(response.data);
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("error: no token provided")
            }
        };

        getPost();
    }, [postId, tokenIsValid, token]);

    // open confirm delete dialog 
    const handleDeleteClick = () => {
        setIsDialogOpen(true); 
    };

    const handleDelete = async (e, postId) => {
        e.preventDefault();
        try {
            await deleteReview(postId, token);
            navigate("/profile");
        } catch (error)
        {
            console.log(error);
        }
    }


    if (!post) {
        return <div className="text-white text-center p-10">Loading post...</div>;
    }


    return (
        <>
            <Navbar></Navbar>
            <div className="flex items-center flex-col h-[100vh] px-5">
                <div key={post.id}
                className="md:w-200 w-full mt-20 mb-10 mx-20 flex flex-col bg-light-purple text-dark-purple rounded-2xl px-4 py-4 shadow-[5px_5px_0px_0px_rgba(117,99,160,0.8)] gap-1 max-w-200">
                    <div className="flex justify-between w-[100%]">
                        <h3>by you</h3>
                        <h3>{formatDate(post.createdAt)}</h3>
                    </div>
                    <span className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                        <img
                        key={index}
                        src={star}
                        width={20}
                        className={index < post.rating ? "opacity-100" : "opacity-20"}
                        alt="star"
                        />
                    ))}
                    </span>
                    <h1 className="text-dark-purple text-left text-3xl">{post.title}</h1>
                    <h3 className="text-left text-xl ">{post.description}</h3>
                    {post.imageUrl ? <img src={post.imageUrl} className="rounded-xl my-3 shadow-md"></img> : ""}
                    <div className="flex gap-2 bg-accent self-end p-2 rounded-xl">
                        <button className="flex"><img src={heart} className="w-5 mr-1"></img>{post.likeCount}</button>
                        <button className="flex"><img src={neutral} className="w-5 mr-1"></img>{post.okayCount}</button>
                        <button className="flex"><img src={tomato} className="w-5 mr-1"></img>{post.dislikeCount}</button>
                    </div>
                </div>
                <div className="flex gap-5 items-center justify-center">
                    <Button action={tokenIsValid? () => setIsModalOpen(true) : ""} colour="bg-accent"  text={"edit"} textColour="text-dark-purple"></Button>
                    <Button action={handleDeleteClick} text={"delete"} colour="bg-red-400" textColour="text-dark-purple"></Button>
                </div>
            </div>
            <EditPost isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} post={post} />
            <ConfirmDialog 
                isOpen={isDialogOpen} 
                message="Are you sure you want to delete this post?"
                onCancel={() => setIsDialogOpen(false)} 
                onConfirm={(e) => handleDelete(e, post.id)} 
                type = "warning"
            />

        </>
    )

}