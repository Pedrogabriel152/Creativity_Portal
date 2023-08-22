import { Route, Routes } from "react-router-dom";
import SignUp from "../Pages/SingUp";
import SignIn from "../Pages/SingIn";
import Blog from "../Pages/Blog";

const RoutesApp = () => {
    return(
        <Routes>
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/" element={<Blog />} />
        </Routes>
    );
}

export default RoutesApp;