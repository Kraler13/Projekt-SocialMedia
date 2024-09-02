import './FollowRecommendation.css'

import axios from "axios";
import { useEffect, useState } from "react";

const FollowRecommendation = (props) => {
    const [recommendation, setRecommendation] = useState([])

    const getRecommendation = () => {
        axios.post("https://akademia108.pl/api/social-app/follows/recommendations")
            .then((res) => {
                setRecommendation(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    useEffect(() => {
        getRecommendation()
    }, [props.posts])

    const follow = (id) => {
        axios.post("https://akademia108.pl/api/social-app/follows/follow", {
            leader_id: id
        })
            .then(() => {
                props.getLatestPosts()
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <div className='followRec'>
            {
                recommendation.map(recommendationToUse => {
                    return <div className="recommends" key={recommendationToUse.id}>
                        <img src={recommendationToUse.avatar_url} alt={recommendationToUse.username} />
                        <h3>{recommendationToUse.username}</h3>
                        <button className="btn" onClick={()=>follow(recommendationToUse.id)}>Follow</button>
                    </div>
                })
            }
        </div>
    );
}

export default FollowRecommendation