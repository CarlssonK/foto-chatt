import React, {useRef} from "react";
import {useAuth} from "../contexts/AuthContext"

export default function Signup() {
const emailRef = useRef();
const passwordRef = useRef();
const passwordConfirmRef = useRef();
//const {Signup} = useAuth();




    return (
        <div>
           

            Signup
            <input type="text" name="" id="" ref={emailRef} />
            <input type="text" name="" id="" ref={passwordRef}/>
            <input type="text" name="" id="" ref={passwordConfirmRef}/>
            <button>Sign up</button>
            
           
        </div>
    );
}


