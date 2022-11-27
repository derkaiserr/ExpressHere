import React, {useRef} from "react";
import NavBar from "./NavBar";


const Discover = (props) => {
  const currentPath = useRef()
  return (<><NavBar isLogged={props.isLogged}/><section>Discover page: We're working on it!!!</section></>)
};

export default Discover;

