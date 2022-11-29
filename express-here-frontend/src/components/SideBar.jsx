import React, { useState, useEffect} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../styles/SideBar.css"
const SideBar = (props) => {
    const [savedPosts, setsavedPosts] = useState([])
    const fetchSavedPosts = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8081/userprofile/savedposts/${props.user.userID}`);
            const responseJson = await response.json();
            setsavedPosts(responseJson.data);
        } catch (err) {
            console.log(err.message);
        }
        };
    // fetch all the user saved posts everytime the user loads his profile
    useEffect(() => {
        fetchSavedPosts();
    }, []);

    const handleComments = (e) =>{
        return
    }
    const handleSupports = (e) =>{
        return
    }
    const handleDelete = async (e) =>{
        e.preventDefault()
        try{
            const response = await fetch(`http://127.0.0.1:8081/username/delete/savedposts/${props.user.userID}`, {
            method: "DELETE",
            body: JSON.stringify({postID: e.target.value}),
            headers: { "Content-Type": "application/json" },
            })
        
            const responseJson = await response.json();
            console.log(responseJson)
            // If post deleted in database, update saved posts
            if (responseJson.status === 200) {
                props.updatePosts(responseJson.data)
                fetchSavedPosts()
            } 
        } catch (err){
            console.log(err.message)
        }
    }
    const evaluateDateAndTime = ((dateAndTime) => {
        const dateTime = new Date(dateAndTime).toUTCString()
        return dateTime
      })

    return (<>
    <main className="blog-card-container">
    {savedPosts.map((post, idx) => {
        return (
        <article className="blog-card full-width">
        <div className="header">
        <div className="sub-header">
            <img src="https://img.icons8.com/office/24/000000/comments.png"/> 
            <button className="secondary-button" onClick={handleComments}>{post.comments} Comments</button>
        </div>
        <div className="sub-header">
            <img src="https://img.icons8.com/nolan/24/amiable---v1.png"/>
            <button className="secondary-button" onClick={handleSupports}>{post.supports} Supports</button>
        </div>
        <div className="sub-header">
            <img src="https://img.icons8.com/color/24/null/delete.png"/>
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
    </article>)
    })}
    </main>
    </>)
};

export default SideBar;

