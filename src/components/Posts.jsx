import { addReaction, fetchAllPosts } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "./Pagination";
import { formatDate } from "../utils/formatDate";
import { isTokenExpired } from "../utils/tokenCheck";

import tomato from "../assets/tomato.svg"
import neutral from "../assets/neutral.svg"
import heart from "../assets/heart.svg"
import star from "../assets/star.svg"


//display all public reviews
export const Posts = () => {

    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const tokenIsValid = !isTokenExpired(token);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    //fetch all posts
    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await fetchAllPosts(page);
                setPosts(response.data.items)
                setTotalPages(response.data.pagination.totalPages)
            } catch (error) {
                console.log(error)
            }
        };
        getPosts();
    },[page])

    const handleReaction = async (reactionType, reviewId) => {
        if (tokenIsValid) {
            try {
                await addReaction({reactionType, reviewId}, token)

                // Re-fetch posts
                const response = await fetchAllPosts();
                setPosts(response.data.items);
    
            } catch (error){
                console.log(error);
            }
        } else {
            console.log("authorisation token null or invalid")
        }
    };

    const handleProfileClick = (e, userId) => {
        e.preventDefault();
        if (tokenIsValid) {
            navigate(`/profile/${userId}`);
        } else {
            navigate(`/login`);
        }
    };
    


    return (
        <ul className="w-full md:w-200 my-5 bg-lightest flex flex-col gap-5 px-3 max-w-200 self-center">
            
            {posts.map((post) => (
                <li key={post.id} className="flex flex-col bg-light-purple text-dark-purple rounded-2xl px-4 py-4 shadow-[5px_5px_0px_0px_rgba(117,99,160,0.8)] gap-1">
                    <div className="flex justify-between w-[100%]">
                    <button onClick={(e) => handleProfileClick(e, post.userId)}>
                        <h3 className="hover:text-red-400 hover:scale-110 duration-300 cursor-pointer">@{post.username}</h3>
                    </button>
                    <h3>{formatDate(post.createdAt)}</h3>
                    </div>
                    {/* rating */}
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
                    {/* title and description */}
                    <h1 className="text-dark-purple text-left text-3xl">{post.title}</h1>
                    <h3 className="text-left text-xl ">{post.description}</h3>
                    {/* image */}
                    {post.imageUrl ? <img src={post.imageUrl} className="rounded-xl my-3 shadow-md"></img> : ""}
                    {/* reactions */}
                    <div className="flex gap-2 bg-accent self-end p-2 rounded-xl">
                        <button onClick={() => handleReaction("Like", post.id,)} className="flex cursor-pointer"><img src={heart} className="w-5 mr-1 hover:scale-150 duration-300"></img>{post.likeCount}</button>
                        <button onClick={() => handleReaction("Okay", post.id)} className="flex cursor-pointer"><img src={neutral} className="w-5 mr-1 hover:scale-150 duration-300"></img>{post.okayCount}</button>
                        <button onClick={() => handleReaction("Dislike", post.id)} className="flex cursor-pointer"><img src={tomato} className="w-5 mr-1 hover:scale-150 duration-300"></img>{post.dislikeCount}</button>
                    </div>


                </li>
                
            ))}
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />

        </ul>

    )
}