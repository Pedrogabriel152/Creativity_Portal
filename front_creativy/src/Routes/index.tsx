import { Route, Routes } from "react-router-dom";
import SignUp from "../Pages/SingUp";
import SignIn from "../Pages/SingIn";

const RoutesApp = () => {
    return(
        <Routes>
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
        </Routes>
    );
}

export default RoutesApp;