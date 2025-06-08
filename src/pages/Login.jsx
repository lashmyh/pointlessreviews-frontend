import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/Button";

// import * as Sentry from "@sentry/react";

export const Login = () => {

    const [username, setUsername] =useState("");
    const [password, setPassword] =useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(null)

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await loginUser({username, password})
            localStorage.setItem("token", response.data.token); //save token
            navigate("/") //redirect to home page
        } catch (error){
            setError("There was an error logging in. Please try again")
            console.log(error);
        }
    };
    return (
        <div className="flex flex-col justify-between h-[100vh] items-center py-1 w-[100vw]">
            <Navbar/>
            <header></header>
            <div className="flex flex-col content-center bg-med-purple/20 rounded-xl px-5 py-10 justify-center items-center w-[85vw] max-w-[25rem]" >
                <h1 className="text-3xl pb-8" >Log in</h1>
                <form onSubmit={handleLogin} className=" rounded-xs w-sm flex flex-col justify-center items-center pb-8">
                    <input className="outline outline-white/50 rounded-xs p-1 mb-3 w-60" type="text" placeholder="Username" value={username}  name="username" onChange={(e) => setUsername(e.target.value)} required></input>
                    <input className="outline outline-white/50 rounded-xs p-1 mb-6 w-60" type="password" placeholder="Password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} required></input>
                    <Button type="submit" text="Log in" colour="bg-med-purple"></Button>
                </form>
                {error && <p className="text-red-400 max-w-80 text-center">{error}</p>}

                <Link to="/register" className="text-yellow-200 underline hover:text-pink-200 transition duration-400 text-center">Don&apos;t have an account? Register here</Link>
            </div>
            <Footer/>
            
        </div>
    );
};



