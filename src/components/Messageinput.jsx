import React, { useEffect, useRef, useState } from "react";
import { useStates } from "react-easier";
import styles from "../styles/Messageinput.module.css";
import { Link, useHistory } from "react-router-dom";
<<<<<<< HEAD
import { Divider } from "@material-ui/core";
=======
>>>>>>> da86ffe5211a1ed31175016a4ae0b9f92e0854f1

function Messageinput({addFile, handleSubmit, handleInput, showComponentBool }) {
    const inputRef = useRef(null);
    const fileRef = useRef(null)
    const formRef = useRef(null)

    const submit = (e) => {
        e.preventDefault(); // Prevent reload
        inputRef.current.value = ""; // Clear input field

        console.log(e)
        handleSubmit(e);

        // fileRef.current.files
    };

    const fileClick = (e) => {
        fileRef.current.click()
    }


    useEffect(() => {
        if(!showComponentBool) {
            formRef.current.reset();
        } 
    }, [showComponentBool])

    return (
        <div className={styles.messageBar}>
<<<<<<< HEAD
            <Link
            className={styles.btn}
            to={{pathname: `/camera`, state: {test: "hahah lool"}}}
            >
                <div className={styles.cameraBtn} >
                    <i className="material-icons">camera_alt</i>
                </div>
=======
            <Link className={styles.btns} to={{pathname: "/camera", state: {path: location.pathname}}} >
                <div className="material-icons">camera_alt</div>
>>>>>>> da86ffe5211a1ed31175016a4ae0b9f92e0854f1
            </Link>

            <button className={styles.btns} onClick={fileClick}>
                <i className="material-icons">photo_size_select_actual</i>
            </button>
                <form onSubmit={submit} className={styles.form} ref={formRef}>
                    <div className={styles.inputMessage}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Skicka ett meddelande.."
                            ref={inputRef}
                            onChange={handleInput}
                        />
                        <input
                            type="file"
                            ref={fileRef}
                            onChange={addFile}
                            accept="image/*,video/*,audio/*"
                            // capture
                            multiple
                            style={{display: "none"}}
                        />
                        <button className={styles.sendBtn}>
                            <i className="material-icons">send</i>
                        </button>
                    </div>
                </form>
            
          
        </div>
    );
}

export default Messageinput;
