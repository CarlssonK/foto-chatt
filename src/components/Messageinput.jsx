import React from 'react'
import styles from '../styles/Messageinput.module.css'

function Messageinput() {
    return (
        <div className={styles.messageBar}>
            <button className={styles.btn}><i className="material-icons">camera_alt</i></button>
            <button className={styles.btn}><i className="material-icons">photo_size_select_actual</i></button>
            <div className={styles.inputMessage}>  
                <form action="" className={styles.form}>
                    <input className={styles.input}type="text" /> 
                </form>
            </div>
            <button className={styles.btn}><i className="material-icons">send</i></button>
        </div>
    )
}

export default Messageinput
