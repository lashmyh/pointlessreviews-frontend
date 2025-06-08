
import { isTokenExpired } from "../utils/tokenCheck";

import { Navbar } from "../components/Navbar";
import { Button } from "../components/Button";
import { Posts } from "../components/Posts";
import { useState } from "react";

import { NewPost } from "./NewPost";

//display all public reviews
export const Home = () => {


    const token = localStorage.getItem("token");
    const tokenIsValid = !isTokenExpired(token);

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="h-[100vh] mt-20 w-[100vw] flex flex-col">
            <Navbar></Navbar>
            <header>
                <h1 className="font-title text-4xl">pointless reviews</h1>
                <h1 className="mb-5">_____________________</h1>
            </header>
            {/* display add post button only if user is logged in */}
            {tokenIsValid ? 
            (<Button text={"add a post"} action={tokenIsValid? () => setIsModalOpen(true) : ""} colour="bg-accent" textColour="text-dark-purple"></Button>) 
            : ("") 
            }

            {/* list of posts */}
            <Posts></Posts>

            {/* new post modal */}
            <NewPost isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        </div>

    )
}