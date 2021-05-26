
import React, { useState } from "react";
import { Link, useHistory} from "react-router-dom"
import styles from "../styles/Login.module.css"

import { useNamedContext } from "react-easier";


export default function login() {

  const g = useNamedContext("global");
  const history = useHistory();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          username,
          password
      }),
    })
    const data = await res.json();
    // Save user data to context
    g.username = data.username
    g.email = data.email
    g.userId = data._id
    // Redirect to home page
    history.push("/");
  }

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className={styles.Container}>
      <h1>Log In</h1>
        
      <form onSubmit={handleLogin}>
        <div className={styles.loginDetails}><input onChange={handleUsername} type="text" name="username" placeholder="Username" autoFocus required /></div>
        <div className={styles.loginDetails}><input onChange={handlePassword} type="password" name="password" placeholder="Password" required /></div>
        <button className={styles.loginDetails}>Log In</button>
        <Link to="/signup"><div className={styles.loginDetails}>Creat a new account Sign Up </div></Link>
      
      </form>
    </div>
  );
}

