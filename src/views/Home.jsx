import './Home.css'

import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import AddPost from '../components/AddPost';

const Home = (props) => {
    const [posts, setPosts] = useState([])

    const getLatestPosts = () => {
        axios.post("https://akademia108.pl/api/social-app/post/latest")
        .then((res)=>{
            setPosts(res.data)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    const getNext = () => {
        axios.post("https://akademia108.pl/api/social-app/post/older-then", {
            date: posts[posts.length - 1].created_at
        })
        .then((res)=>{
            setPosts(posts.concat(res.data))
        })
        .catch((error) => {
            console.error(error)
        })
    }

    const getNew = () => {
        axios.post("https://akademia108.pl/api/social-app/post/newer-then", {
            date: posts[0].created_at
        })
        .then((res)=>{
            setPosts(res.data.concat(posts))
        })
        .catch((error) => {
            console.error(error)
        })
    }
    useEffect(() => {
        getLatestPosts();
    }, [props.user])
    console.log(posts)
    return (
        <div className="Home">
            {props.user && <AddPost getNew={getNew}/>}
            <div className="postList">
                {posts.map((post) => {
                    return <Post post={post} key={post.id} user={props.user}/>
                })}
                <button onClick={getNext} className='btn loadMore'>Load</button>
            </div>
        </div>
    );
}

export default Home;