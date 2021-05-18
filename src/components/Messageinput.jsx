import React, { useEffect, useRef, useState } from "react";
import { useStates } from "react-easier";
import styles from "../styles/Messageinput.module.css";

function Messageinput({ handleSubmit, handleInput }) {
    const inputRef = useRef(null);

    const submit = (e) => {
        e.preventDefault(); // Prevent reload
        inputRef.current.value = ""; // Clear input field
        handleSubmit(e);
    };

    return (
        <div className={styles.messageBar}>
            <button className={styles.btn}>
                <i className="material-icons">camera_alt</i>
            </button>
            <button className={styles.btn}>
                <i className="material-icons">photo_size_select_actual</i>
            </button>
            <div className={styles.inputMessage}>
                <form onSubmit={submit} className={styles.form}>
                    <input
                        className={styles.input}
                        type="text"
                        ref={inputRef}
                        onChange={handleInput}
                    />
                </form>
            </div>
            <button className={styles.btn}>
                <i className="material-icons">send</i>
            </button>
        </div>
    );
}

export default Messageinput;
