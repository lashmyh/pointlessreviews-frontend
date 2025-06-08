import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Test } from "./pages/Test";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { ProfileTest } from "./pages/ProfileTest";
import { SinglePost } from "./pages/SinglePost";

function App() {

  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route path="/profile/:userId?" element={<Profile />}></Route>
          <Route path="/profiletest" element={<ProfileTest />}></Route>
          <Route path="/review/:postId" element={<SinglePost />}></Route>


          <Route path="/" element={<Home />}></Route>


        </Routes>
    </Router>
  )
}

export default App
