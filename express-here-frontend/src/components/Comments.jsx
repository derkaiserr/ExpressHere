import React, {useRef} from "react";
import "../styles/Discover.css";

const Comments = (props) => {
  const currentPath = useRef()
  return (<>
  <div>
    <input type="text" placeholder="Say something..."/>
  </div>
  </>)
};

export default Comments;

