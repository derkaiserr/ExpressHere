import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import "../styles/Discover.css";
import Comments from "./Comments";

const Discover = (props) => {

  const handleComments = (e) =>{
    return
  }
  const handleSupports = (e) =>{
    return
  }
  const handleSaves = (e) =>{
    return
  }
  const evaluateDateAndTime = ((dateAndTime) => {
    const dateTime = new Date(dateAndTime).toUTCString()
    return dateTime
  })

  return (<>
  <NavBar isLogged={props.isLogged} user={props.user} updateUser={props.updateUser} changeLogStatus={props.changeLogStatus}/>
  <main className="blog-card-container discover-card">
  {props.posts.map((post, idx) => {
    return (<article className="blog-card full-width">
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
        <img src="https://img.icons8.com/3d-fluency/24/null/save.png"/> 
        <button className="secondary-button" onClick={handleSaves}>{post.saves} Saves</button>
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
  </>)
};

export default Discover;

