import { Route, Routes } from "react-router-dom";
import SignUp from "../Pages/SingUp";
import SignIn from "../Pages/SingIn";
import Blog from "../Pages/Blog";
import Home from "../Pages/Home";

const RoutesApp = () => {
    return(
        <Routes>
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/post/:id" element={<Blog />} />
            <Route path="/" element={<Home />} />            
        </Routes>
    );
}

export default RoutesApp;