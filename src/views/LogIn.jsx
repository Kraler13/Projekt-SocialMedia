import { useState } from 'react';
import './LogIn.css'
import axios from "axios";
import { Navigate } from 'react-router-dom';


const LogIn = (props) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [logInMessage, setlogInMessage] = useState('')

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name

        setFormData({
            ...formData,
            [name]: target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("https://akademia108.pl/api/social-app/user/login", {
            username: formData.username,
            password: formData.password
        })
            .then((res) => {
                if (Array.isArray(res.data.username)) {
                    setlogInMessage(res.data.username[0])
                }
                else if (Array.isArray(res.data.password)) {
                    setlogInMessage(res.data.password[0])
                }
                else if (Array.isArray(res.data.error)) {
                    setlogInMessage("Incorrect username or password")
                }
                else {
                    setlogInMessage("")
                    props.setUser
                    localStorage.setItem('user', JSON.stringify(res.data))
                }

            })
            .catch((error) => {
                console.error(error)
            })
    }
    return (
        <div className="logIn">
            {props.user && <Navigate to="/" />}
            <form onSubmit={handleSubmit}>
                {logInMessage && <h2>{logInMessage}</h2>}
                <input type="text" name="username" placeholder="User Name" value={formData.username} onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
                <button className="btn">LogIn</button>
            </form>
        </div>
    );
}

export default LogIn;