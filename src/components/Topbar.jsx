import React from 'react'
import styles from '../styles/Topbar.module.css'
import { useLocation, useHistory } from 'react-router-dom'

function Topbar() {
    const loc = useLocation()
    const history = useHistory()
    return (
        <div>
        <div className={styles.topbar}>
             <button className={styles.btn}>{loc.pathname != '/' ? (
             <i onClick={history.goBack} className="material-icons">arrow_back</i>
             ) : ''}</button>
            <h4>hej</h4>
            <button className={styles.btn}><i><a href="/Profile" className="material-icons">manage_accounts</a></i></button>
        </div>
        </div>
    )
}

export default Topbar
