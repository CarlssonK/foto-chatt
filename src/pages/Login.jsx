
import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory} from "react-router-dom"
import styles from "../styles/Login.module.css"


export default function login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const history = useHistory();

  
  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/")
    } catch {
      setError("Incorrect password");
    }
    setLoading(false);
  }

  return (
    <div className ={styles.Container}>
      <h1>Log In </h1>
      
      <form  onSubmit = {handleSubmit}>
          {error && <div className={styles.error}><p>{error}</p></div>}
     <div className ={styles.loginDetails}><input className ={styles.text} type="email" name="" id="" ref={emailRef} required /></div>
     <div className ={styles.loginDetails}><input type="text" name="" id="" ref={passwordRef} required /></div>
      <button className={styles.loginDetails} disabled = {loading}>Log In</button>
      <div className ={styles.loginDetails}><Link to="/Signup">Creat a new account Sign Up </Link></div>         
     
      </form>
    </div>
  );
}

