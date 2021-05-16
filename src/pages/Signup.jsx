import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  
  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords dosen't match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("404");
    }
    setLoading(false);
  }

  return (
    <div>
      Signup
      
      <form onSubmit = {handleSubmit}>
          {error && <h1>{error}</h1>}
      <input type="email" name="" id="" ref={emailRef} required />
      <input type="password" name="" id="" ref={passwordRef} required />
      <input type="password" name="" id="" ref={passwordConfirmRef} required />
      <button disabled = {loading}>Sign up</button>
      </form>
    </div>
  );
}
