import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";

import { Navbar } from "../components/Navbar";

export const Register = () => {

    const [username, setUsername] =useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const navigate = useNavigate();

    // password  must be at least 8 characters long, contain at least one uppercase letter, and at least one number
    const isValidPassword = (password) => {
        return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(""); // reset error state

        //check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return;
        }
        //check password strength
        if (!isValidPassword(password)){
            setError("Password must be at least 8 characters, include one uppercase letter and one number.");
            return;
        }

        try{
            await registerUser({username, password});
            navigate("/login");
        } catch (error) {
            console.error("Registration failed", error.response?.data?.error)
        }
    }

    return (
        <div className="flex flex-col justify-between h-[100vh] items-center py-1 w-[100vw]">
            <Navbar/>
            <header></header>
            <div className="flex flex-col content-center bg-med-purple/20 rounded-xl px-5 py-10 justify-center items-center w-[85vw] max-w-[25rem]">
                <h1 className="text-3xl pb-8">Sign up</h1>
                <form onSubmit={handleRegister} className=" rounded-xs w-sm flex flex-col justify-center items-center pb-8">
                    <input className="outline outline-white/50 rounded-xs p-1 mb-3 w-60" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input className="outline outline-white/50 rounded-xs p-1 mb-3 w-60" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <input className="outline outline-white/50 rounded-xs p-1 mb-6 w-60" type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    
                    <Button type="submit" text="Register" colour="bg-med-purple"></Button>
                </form>
                {error && <p className="text-red-400 max-w-80 text-center">{error}</p>}

                <Link to="/login" className=" text-yellow-200 underline hover:text-pink-200 hover:scale-105 duration-300 text-center">Already have an account? Log in here</Link>
            </div>
            <Footer></Footer>
        </div>
    )
}