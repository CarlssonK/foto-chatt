
import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom"
import styles from "../styles/Login.module.css"



export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const history = useHistory();

  
  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords dosen't match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/username")
    } catch {
      setError("something went wrong");
    }
    setLoading(false);
  }

  return (
    <div className ={styles.Container}>
      <h1>Signup</h1>
      
      <form onSubmit = {handleSubmit}>
      {error && <div className={styles.error}><p>{error}</p></div>}
      <div className ={styles.loginDetails}><input type="email" name="" id="" ref={emailRef} placeholder="Email" required /></div>
      <div className ={styles.loginDetails}><input type="text"/* type="password" */ name="" id="" ref={passwordRef} placeholder="Password"  required /></div>
      <div className ={styles.loginDetails}><input type="text" /* type="password" */ name="" id="" ref={passwordConfirmRef} placeholder="Re-enter Password" required /></div>
      <button className ={styles.loginDetails} disabled = {loading}>Sign up</button>
      <div className ={styles.loginDetails}> <Link to="/login"> Have an account Log In </Link></div>
      </form>
    </div>
  );
}
