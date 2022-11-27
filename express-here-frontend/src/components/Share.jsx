import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Share.css";
import FormInput from "./FormInput";

const Share = (props) => {
  let navigate = useNavigate()
   // const numOfUserPosts = props.user.userPosts.length
  const initialValue = {
    // postID: `${props.user.id}${(numOfUserPosts + 1) * 1000}`,
    // author: `${props.user.name}`,
    postID: "DummyID",
    author: "DummyAuthor",
    post: "",
    comments: 0,
    supports: 0,
    saves: 0,
    postType: false,
    relevantKeywords: "",
    relevantPicture: new FormData()
  };
  const [values, setValues] = useState(initialValue)

  const inputs = [
    {
      id: 1,
      name: "post",
      type: "text",
      placeholder: "I want to share my experience of...",
      required: true,
    },
    {
      id: 3,
      name: "relevantKeywords",
      type: "text",
      placeholder: "Hi, love, ...",
      label: "Keywords",
    }
  ];

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:3001/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
    })

    const responseJson = await response.json();
    // If post was successfully recorded, 
    if (responseJson.status === 200) {
        props.posts.setPosts(responseJson.body)
        navigate("/") // navigate back to the index page 
    } else {// If not recorded,
      setValues(initialValue) //re-load the same page
    }
}

  const onAlter = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
}

  const fileHandler = (e) =>{
    const files = e.target.files
    const formData = new FormData()
    formData.append('image', files[0])
    setValues({...values, [e.target.name]: formData})
  }

  return (
    <div className="share-section">
      <form onSubmit={handleSubmit}>
        <h1>Share Anything!</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onAlter}
          />
        ))}
        <div className="relevantPicture postType">
          <label for="relevantPicture">Upload File</label>
          <input name="relevantPicture" type="file" id="relevantPicture" accept="image/" onChange={fileHandler} required="true"/>
        </div>
        <h2>How do you want to make this post?</h2>
        <div class="postType">
          <label for="anon">Anonymous</label>
          <input name="postType" type="radio" value="anonymous" id="anon" onChange={e => setValues({...values, postType: false})} required="true"></input>
        </div>
        <div className="postType">
          <label for="userN">Use My Name</label>
          <input name="postType" type="radio" value="username" id="userN" onChange={e => setValues({...values, postType: true})} required="true"></input>
        </div>
        <input type="submit" value="Submit" className="btn solid" />
      </form>
    </div>
  );
};

export default Share;