import { Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import LogIn from "../views/LogIn";
import SignUp from "../views/SignUp";

const AppRoutes = (props) => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn setUser={props.setUser} user={props.user}/>} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    );
}

export default AppRoutes