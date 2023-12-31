import { Route, Routes } from "react-router-dom";

// Pages
import SignUp from "../Pages/SingUp";
import SignIn from "../Pages/SingIn";
import Blog from "../Pages/Post";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile";
import MyPosts from "../Pages/MyPosts";
import User from "../Pages/User";
import ForgotPassword from "../Pages/ForgotPassword";
import EmailRecoverPassword from "../Pages/EmailRecoverPassword";

const RoutesApp = () => {
    return(
        <Routes>
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/post/:id" element={<Blog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-posts" element={<MyPosts />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/email-recover-password" element={<EmailRecoverPassword />} />
            <Route path="/forgot-password/:token" element={<ForgotPassword />} />
            <Route path="/" element={<Home />} />            
        </Routes>
    );
}

export default RoutesApp;