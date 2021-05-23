import React, { useContext, useState, useEffect } from "react";
import { auth } from "../pages/firebase";
import {createContext} from "react"



const AuthContext = React.createContext();


auth.onAuthStateChanged(user => { 
  if (user) {
    console.log("user logged in", user.email);}

    else {
      console.log("user logged out")
    }
   
   return user  
  }
)



export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

function signup(email, password) {
      return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email,password) {
return auth.signInWithEmailAndPassword(email, password)

  }

 useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
    })
    return unsubscribe
 },[])

  const value = {
    currentUser,
    signup,
    login
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

