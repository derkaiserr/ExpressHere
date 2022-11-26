import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./App.css";
import Discover from "./components/Discover"
import Share from "./components/Share"
import Login from "./components/Login";
import SignUp from "./components/SignUp"
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index="/" element={<Discover />} />
        <Route path="/share" element={<Share />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
