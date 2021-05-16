import React from "react";
import Messageinput from "../components/Messageinput";
import styles from '../styles/Chat.module.css'

function Chat() {
    return (
        <div>
            <div className={styles.messageContainer}>
                <div className={styles.myMessageField}>
                    <div className={styles.myMessage}>
                        <p className={styles.content}>Lorem ipsum dolor sit</p>
                    </div>
                    <p className={styles.myName}>Jane Doe</p>
                </div>
                <div className={styles.otherMessageField}>
                    <div className={styles.otherMessage}>
                        <p className={styles.content}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda commodi, reprehenderit.</p>
                    </div>
                    <p className={styles.otherName}>John Doe</p>
                </div>
                <div className={styles.otherMessageField}>
                    <div className={styles.otherMessage}>
                        <p className={styles.content}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, dolorum. Voluptates dignissimos laborum animi, quaerat recusandae illo deleniti nobis commodi!</p>
                    </div>
                    <p className={styles.otherName}>John Doe</p>
                </div>
            </div>
            <Messageinput />
        </div>
    );
}

export default Chat;
