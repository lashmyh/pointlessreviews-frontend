import { Link, useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/tokenCheck";

import home from "../assets/home.svg";
import profile from "../assets/profile.svg";

import { Button } from "./Button";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    const token = localStorage.getItem("token");
    const tokenIsValid = !isTokenExpired(token);

    return (

        <nav className="bg-med-purple/20 fixed top-0 z-50  w-full h-15 px-5  border-pink-200/50 flex items-center justify-between">
            {/* left hand side */}
            <Link className=" bg-sky-dark p-3  rounded-lg hover:bg-pink-300 hover:scale-105 duration-300" to="/">
                <img src={home} className="w-7 h-7 mr-2 invert"></img> 
            </Link> 

            {/* right hand side */}
            <div className="flex items-center">
                {tokenIsValid ? (
                    <Link className=" bg-sky-dark p-3 mx-2 rounded-lg hover:bg-pink-300 hover:scale-105 duration-300" to="/profile">
                        <img src={profile} className="w-6 mx-1 h-6 invert"></img>
                    </Link>
                ) : ("")}
                
                {/* log out / log in button depending on user logged in status */}
                {tokenIsValid ? (
                    <Button text="Log out" action={handleLogout} colour="bg-transparent"></Button>
                ) : 
                <Link className=" bg-sky-dark p-3 mr-2 rounded-lg hover:bg-pink-300 hover:scale-105 duration-300" to="/login">Log in</Link>
                }
            </div>
        </nav>
    );
};


