import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Share.css";
import FormInput from "./FormInput";

const Share = (props) => {
  let navigate = useNavigate()
  const initialValue = {
      postID: `${props.user.userID}*%${generateUID()}`,
      author: `${props.user.name}`,
      post: "",
      postType: false,
      relevantKeywords: "",
    };

    function generateUID() {
      var firstPart = (Math.random() * 46656) | 0;
      var secondPart = (Math.random() * 46656) | 0;
      firstPart = ("000" + firstPart.toString(36)).slice(-3);
      secondPart = ("000" + secondPart.toString(36)).slice(-3);
      return firstPart + secondPart;
  }
  
  
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
      placeholder: "Love, Sad ...",
      label: "Highlights",
    }
  ];

  const onAlter = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
}

const handleSubmit = async (e) => {
  e.preventDefault()
  try{
      const response = await fetch(`http://127.0.0.1:8081/share/${props.user.userID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      })

      const responseJson = await response.json();
      console.log(responseJson)
      // If post added in database, update current posts
      if (responseJson.status === 200) {
          props.updatePosts(responseJson.data)
          navigate("/") // navigate back to the previous page   
      } 
  } catch (err){
      console.log(err.message)
  }
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