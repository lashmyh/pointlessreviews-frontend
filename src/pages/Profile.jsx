import { useEffect, useState } from "react";
import { fetchProfile } from "../api";
import { useParams } from "react-router-dom";
import { isTokenExpired } from "../utils/tokenCheck";
import { formatDate } from "../utils/formatDate";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../components/Navbar";

import tomato from "../assets/tomato.svg"
import neutral from "../assets/neutral.svg"
import heart from "../assets/heart.svg"
import star from "../assets/star.svg"

export const Profile = () => {

    const { userId } = useParams(); // get userId from URL
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);

    const token = localStorage.getItem("token");
    const tokenIsValid = !isTokenExpired(token);

    const navigate = useNavigate();

    useEffect(() => {
        const getProfile = async () => {
            if (tokenIsValid) {
                try {
                    const response = userId
                    ? await fetchProfile(token, userId) // fetch another users profile
                    : await fetchProfile(token); // fetch current users profile
        
                    setProfile(response.data);
                    setPosts(response.data.reviews)
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("error: no token provided")
            }
        };

        getProfile();
    }, [token, userId, tokenIsValid]);

    const handlePostClick = (e, postId) => {
        e.preventDefault();
        navigate(`/review/${postId}`);
    }

    if (!profile) return <div>Loading...</div>;

    return (
    <div className="w-[100vw] flex flex-col justify-center">
        <Navbar></Navbar>
        <div className=" max-w-200 self-center w-full">
            <h1 className="mt-20 text-xl text-left px-5 md:w-200 ">All reviews by {profile.username}</h1>
            <ul className=" bg-bg flex flex-col gap-5 mt-5 px-3 max-w-200 self-center">
            
                {posts.map((post) => (
                    <li key={post.id} onClick={(e) => handlePostClick(e, post.id)}
                    className="flex flex-col bg-light-purple text-dark-purple rounded-2xl px-4 py-4 shadow-[5px_5px_0px_0px_rgba(117,99,160,0.8)] gap-1 cursor-pointer"
                    >
                        <div className="flex justify-between w-[100%]">
                            {userId ? <h3>by {profile.username}</h3> : <h3> by you</h3>}
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
                        <div className="flex gap-2 bg-accent self-end p-2 rounded-xl">
                            <button className="flex"><img src={heart} className="w-5 mr-1"></img>{post.likeCount}</button>
                            <button className="flex"><img src={neutral} className="w-5 mr-1"></img>{post.okayCount}</button>
                            <button className="flex"><img src={tomato} className="w-5 mr-1"></img>{post.dislikeCount}</button>
                        </div>
                    </li>
    
                ))}
            </ul>
        </div>
    </div>
    );
};


