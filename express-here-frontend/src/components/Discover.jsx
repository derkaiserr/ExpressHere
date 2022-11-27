import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import "../styles/Discover.css";
import Comments from "./Comments";

const Discover = (props) => {
  return (<>
  <NavBar isLogged={props.isLogged}/>
  <main class="blog-card-container">
  {props.posts.map((post, idx) => {
    return (<article className="blog-card full-width">
    <div className="thumbnail">
      <a href="are-there-a-couple-of-universes.html"
        ><img alt={`img{idx}`}
      /></a>
    </div>
    <div className="header">
      <div className="sub-header">
        <img src="https://img.icons8.com/office/24/000000/comments.png"/> 
        <Link>{post.comments} Comments</Link>
      </div>
      <div className="sub-header">
        <img src="https://img.icons8.com/nolan/24/amiable---v1.png"/>
        <Link>{post.supports} Supports</Link>
      </div>
      <div className="sub-header">
        <img src="https://img.icons8.com/3d-fluency/24/null/save.png"/> 
        <Link>{post.saves} Save</Link>
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
  </>)
};

export default Discover;

