import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "../styles/MainDash.css";
import Comments from "./Comments";

const MainDash = (props) => {
    const [userPosts, setuserPosts] = useState([])
    const fetchUserPosts = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/userprofile/userposts/${props.user.userID}`);
            const responseJson = await response.json();
            console.log(responseJson)
            setuserPosts(responseJson.data);
        } catch (err) {
            console.log(err.message);
        }
        };
    // fetch all the user posts everytime the user loads his profile
    useEffect(() => {
        fetchUserPosts();
    }, []);

    const handleComments = (e) =>{
        return
    }

    const evaluateDateAndTime = ((dateAndTime) => {
        const dateTime = new Date(dateAndTime).toUTCString()
        return dateTime
      })

    const handleDelete = async (e) =>{
        e.preventDefault()
        try{
            const response = await fetch(`http://127.0.0.1:5000/username/delete/userposts/${props.user.userID}`, {
            method: "DELETE",
            body: JSON.stringify({postID: e.target.value}),
            headers: { "Content-Type": "application/json" },
            })
        
            const responseJson = await response.json();
            console.log(responseJson)
            // If post deleted in database, update saved posts
            if (responseJson.status === 200) {
                props.updatePosts(responseJson.data)
                fetchUserPosts()
            } 
        } catch (err){
            console.log(err.message)
        }
    }

    return (<div>
    <main className="blog-card-container">
    {userPosts.map((post, idx) => {
        return (<article className="blog-card full-width">
        <div className="header">
        <div className="sub-header">
            <img src="https://img.icons8.com/office/40/000000/comments.png"/> 
            <button className="secondary-button" onClick={handleComments}>{post.comments} Comments</button>
        </div>
        <div className="sub-header">
            <img src="https://img.icons8.com/color/40/null/delete.png"/>
            <button className="secondary-button" onClick={handleDelete} value={post.postID}> Delete</button>
        </div>
        </div>
        <p>
        {post.post}
        </p>
        <footer className="author">
        <address>{post.author}</address>
        <span> on </span>
        <time>{evaluateDateAndTime(post.createdAt)}</time>
        </footer>
        <Comments/>
    </article>)
    })}
    </main>
    </div>)
};

export default MainDash;

