
import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory} from "react-router-dom"


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
      setError("wrong password");
    }
    setLoading(false);
  }

  return (
    <div>
      Log In 
      
      <form onSubmit = {handleSubmit}>
          {error && <h1>{error}</h1>}
      <input type="email" name="" id="" ref={emailRef} required />
      <input type="text" name="" id="" ref={passwordRef} required />
      <button disabled = {loading}>Log In</button>
      <div>
          Creat a new account<Link to="/Signup"> Sign Up </Link>
      
      </div>
      </form>
    </div>
  );
}
