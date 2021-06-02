import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../styles/Signup.module.css";

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

    if (password !== passwordConfirm)
      return console.error("Password must match!");

    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await res.json();
    // Save username & email to context
    g.username = data.username;
    g.email = data.email;
    // Redirect to home page
    history.push("/");
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  return (
    <div className={styles.Container}>
      <section className={styles.head}>
      <h3 className={styles.h3}>Sign Up</h3>
        <img className={styles.img}src="../assets/icons/icon.png" alt="" />
      </section>
      <form onSubmit={handleRegister}>
        <div className={styles.loginDetails}>
          <input
            className={styles.input}
            onChange={handleUsername}
            type="text"
            name="username"
            placeholder="Username"
            autoFocus
            required
          />
        </div>
        <div className={styles.loginDetails}>
          <input
            className={styles.input}
            onChange={handleEmail}
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <div className={styles.loginDetails}>
          <input
            className={styles.input}
            onChange={handlePassword}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <div className={styles.loginDetails}>
          <input
            className={styles.input}
            onChange={handlePasswordConfirm}
            type="password"
            name="password"
            placeholder="Confirm Password"
            required
          />
        </div>
        <button className={styles.signupBtn}><b>SIGN UP</b></button>
        <Link to="/login">
          <p className={styles.loginLink}>Already have an account? <b>LogIn</b></p>
        </Link>
      </form>
    </div>
  );
}
