import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./App.css";
import Discover from "./components/Discover";
import Share from "./components/Share";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
function App() {
  const [user, setUser] = useState({ name: "", id: "" });
  const [isLogged, setisLogged] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route
          index="/"
          element={<Discover userDetails={user} isLogged={isLogged} />}
        />
        <Route
          path="/share"
          element={<Share userDetails={user} isLogged={isLogged} />}
        />
        <Route
          path="/login"
          element={<Login userDetails={user} isLogged={isLogged} />}
        />
        <Route
          path="/signup"
          element={<SignUp userDetails={user} isLogged={isLogged} />}
        />
      </Routes>
    </div>
  );
}

export default App;
