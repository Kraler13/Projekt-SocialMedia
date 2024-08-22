import './Home.css'

import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../components/Post";

const Home = () => {
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

    useEffect(() => {
        getLatestPosts();
    }, [])
    console.log(posts)
    return (
        <div className="Home">
            <div className="postList">
                {posts.map((post) => {
                    return <Post post={post} key={post.id} />
                })}
                <button onClick={getNext} className='btn loadMore'>Load</button>
            </div>
        </div>
    );
}

export default Home;