import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./App.css";
import Discover from "./components/Discover";
import Share from "./components/Share";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserProfile from "./components/UserProfile";
function App() {
  const [user, setUser] = useState({
    userID: "",
    name: "",
    savedPostsIDs: [],
    userPostsIDs: [],
    password: "",
  });

  const [isLogged, setisLogged] = useState(false);
  const [posts, setPosts] = useState([]);

  // const fetchPosts = async () => {
  //   const response = await fetch("http://localhost:3001/posts", {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(posts),
  //   });
  //   const responseJson = await response.json();
  //   setPosts(responseJson.data);
  // };

  // useEffect(() => {
  //   fetchPosts();
  // }, [posts]);

  return (
    <div className="App">
      <Routes>
        <Route
          index="/"
          element={<Discover user={user} isLogged={isLogged} posts={posts} />}
        />
        <Route
          path="/share"
          element={<Share user={user} isLogged={isLogged} posts={posts} />}
        />
        <Route
          path="/login"
          element={
            <Login
              logUser={(newUser) => setUser(newUser)}
              changeLogStatus={(newStatus) => setisLogged(newStatus)}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp
              logUser={(newUser) => setUser(newUser)}
              changeLogStatus={(newStatus) => setisLogged(newStatus)}
            />
          }
        />
        <Route
          path="/userprofile"
          element={<UserProfile user={user} isLogged={isLogged} />}
        />
      </Routes>
    </div>
  );
}

export default App;
