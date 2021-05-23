
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom"
import styles from "../styles/Login.module.css"

import { useNamedContext } from "react-easier";


export default function Signup() {

  const history = useHistory();
  let g = useNamedContext("global");

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  const handleRegister = async (e) => {
    e.preventDefault();

    if(password !== passwordConfirm) return console.error("Password must match!")

    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          username,
          email,
          password
      }),
    })
    const data = await res.json();
    // Save username & email to context
    g.username = data.username
    g.email = data.email
    // Redirect to home page
    history.push('/');
  }

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value)
  }

  return (
    <div className={styles.Container}>
      <h1>Signup</h1>
      <form onSubmit={handleRegister}>
        <div className={styles.loginDetails}><input onChange={handleUsername} type="text" name="username" placeholder="Username" autoFocus required /></div>
        <div className={styles.loginDetails}><input onChange={handleEmail} type="email" name="email" placeholder="Email" required /></div>
        <div className={styles.loginDetails}><input onChange={handlePassword} type="password" name="password" placeholder="Password" required /></div>
        <div className={styles.loginDetails}><input onChange={handlePasswordConfirm} type="password" name="password" placeholder="Re-enter Password" required /></div>
        <button className={styles.loginDetails}>Sign up</button>
        <Link to="/login"><div className={styles.loginDetails}> Have an account Log In</div></Link>
      </form>
    </div>
  );
}
