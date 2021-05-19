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
        <div className ={styles.container}> 

            <h1>Choose Username</h1>
            <form onSubmit = {handleSubmit} > 
                <input type="text" required 
                value={user}
                onChange = { e => setUser(e.target.value)}
                />
            <button> Create </button>
            </form>
            
        </div>
    )
}
