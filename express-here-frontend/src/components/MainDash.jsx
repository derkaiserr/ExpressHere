import React from "react";
import { Link } from "react-router-dom";
import "../styles/MainDash.css";
import Comments from "./Comments";

const MainDash = (props) => {
    const dummyData = [{
        postID: "bikalpa728@gmail.com7001",
        author: "Bikalpa",
        post: "I am having exams stress issues. Anyone willing to help?",
        comments: 0,
        supports: 0,
        saves: 0,
        postType: false,
        relevantKeywords: "exams, stress",
        relevantPicture: new FormData()
      },
      {
        postID: "jakeshoudy123@gmail.com1231231",
        author: "Jake",
        post: "There are always some people who think they are the smartest in the class, but actually they aren't.",
        comments: 10,
        supports: 100,
        saves: 101,
        postType: true,
        relevantKeywords: "smartest, wierd",
        relevantPicture: new FormData()
      },
      {
        postID: "iamgod@outlook.com",
        author: "Elon Musk",
        post: "Why would someone eat spaghetti with hotdog?",
        comments: 101,
        supports: 1000,
        saves: 10,
        postType: true,
        relevantKeywords: "spaghetti",
        relevantPicture: new FormData()
      },
    {
        postID: "rampeddoing@gmail.com",
        author: "Ronaldo7",
        post: "I love playing cricket. But there those who hate it. They are idiots.",
        comments: 80,
        supports: 10,
        saves: 10,
        postType: true,
        relevantKeywords: "cricket",
        relevantPicture: new FormData()
      }]
      const handleComments = (e) =>{
        return
    }
    const handleSupports = (e) =>{
        return
    }
    const handleSaves = (e) =>{
        return
    }
    const handleDelete = (e) =>{
        return
    }
    return (<div>
    <main class="blog-card-container">
    {dummyData.map((post, idx) => {
        return (<article className="blog-card full-width">
        <div className="thumbnail">
        <a href="are-there-a-couple-of-universes.html"
            ><img alt={`img{idx}`}
        /></a>
        </div>
        <div className="header">
        <div className="sub-header">
            <img src="https://img.icons8.com/office/24/000000/comments.png"/> 
            <button className="secondary-button" onClick={handleComments}>{post.comments} Comments</button>
        </div>
        <div className="sub-header">
            <img src="https://img.icons8.com/nolan/24/amiable---v1.png"/>
            <button className="secondary-button" onClick={handleSupports}>{post.supports} supports</button>
        </div>
        <div className="sub-header">
            <img src="https://img.icons8.com/3d-fluency/24/null/save.png"/> 
            <button className="secondary-button" onClick={handleSaves}>{post.saves} Saves</button>
        </div>
        <div className="sub-header">
            <img src="https://img.icons8.com/color/24/null/delete.png"/>
            <button className="secondary-button" onClick={handleDelete}> Delete</button>
        </div>
        </div>
        <p>
        {post.post}
        </p>
        <footer className="author">
        <address>{post.author}</address>
        <span> on </span>
        <time>{post.time}</time>
        </footer>
        <Comments/>
    </article>)
    })}
    </main>
    </div>)
};

export default MainDash;

