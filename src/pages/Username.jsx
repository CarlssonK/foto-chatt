import React, { useState } from 'react'
import styles from "../styles/Login.module.css"
import { Link, useHistory} from "react-router-dom"
import { database } from "../pages/firebase"
import { useAuth } from "../contexts/AuthContext"


export default function Username() {
const[user, setUser] = useState("")
const history = useHistory();
const { currentUser } = useAuth()

function handleSubmit(e){
e.preventDefault()
database.users.add({
    name : user,
    UserId : currentUser.uid
})
history.push("/")
}

    return (
        <div className ={styles.Container}> 

            <h2>Username</h2>
            <form onSubmit = {handleSubmit} > 
              <div className ={styles.loginDetails}> <input type="text" 
                value={user}
                onChange = { e => setUser(e.target.value)}
                required /></div> 
            <button className ={styles.loginDetails}> Create </button>
            </form>
            
        </div>
    )
}
