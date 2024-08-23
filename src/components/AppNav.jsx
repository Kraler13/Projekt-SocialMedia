import { Link } from "react-router-dom";
import './AppNav.css'
import axios from "axios";

const AppNav = (props) => {
    const hendleLogOut = (e) => {
        e.preventDefault();

        axios.post("https://akademia108.pl/api/social-app/user/logout")
            .then((res) => {
                if (res.data.message) {
                    props.setUser(null);
                    localStorage.setItem("user", null);
                }
            })
            .catch((error) => {
                props.setUser(null);
                localStorage.setItem("user", null);
                console.error(error)
            })
    }


    return (
        <nav className="mainNav">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {!props.user && <li>
                    <Link to="/login">Login</Link>
                </li>}
                {!props.user && <li>
                    <Link to="/signup">Sign Up</Link>
                </li>}
                {props.user && <li>
                    <Link to="/" onClick={hendleLogOut}>Log Out</Link>
                </li>}
            </ul>
        </nav>
    );
}

export default AppNav