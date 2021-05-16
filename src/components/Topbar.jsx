import React from 'react'
import styles from '../styles/Topbar.module.css'


function Topbar() {
    return (
        <div className={styles.topbar}>
             <button className={styles.btn}><i className="material-icons">arrow_back</i></button>
            <h4>hej</h4>
            <button className={styles.btn}><i className="material-icons">manage_accounts</i></button>
        </div>
    )
}

export default Topbar
