
import React from 'react'
import { Redirect, Route } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({ componet: Componet, ...rest}) 
{
const {currentUser} = useAuth

    return (
        <Route
    {...rest }
    render = {props => {
      return currentUser ? <componet {...props} /> :
         <Redirect to ="/signup"/>
    }}

        ></Route>
            
        
    )
}
