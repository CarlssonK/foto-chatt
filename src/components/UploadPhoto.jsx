import React, {useEffect, useState, useRef} from 'react'
import Zoom from '@material-ui/core/Zoom';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/UploadPhoto.module.css'

function UploadPhoto({images, handleSubmit, handleInput, showComponentBool, closePhotoUpload, inputValue}) {

    const inputRef = useRef(null);
    // const fileRef = useRef(null)


    const submit = (e) => {
        e.preventDefault();
        inputRef.current.value = ""; // Clear input field
        handleSubmit(e);
        closePhotoUpload();
    }


    useEffect(() => {
        if(showComponentBool) inputRef.current.value = inputValue
    }, [showComponentBool])


    // const fileClick = (e) => {
    //     fileRef.current.click()
    // }


        return (
            <Zoom in={showComponentBool}>
                <div className={styles.outerContainer}>
                    <div className={styles.innerContainer}>
                        <section className={styles.head}>
                            <h5 className={styles.heading}>Uploaded Photo</h5>
                            <button className={styles.btn} onClick={closePhotoUpload} ><i className="material-icons">close</i></button>
                        </section>
                        <div className={styles.imageContainer}>
                            {
                                images && images.map(url =>  {
                                    return <img className={styles.img} key={Math.random(1 * 100000)} src={url}></img>
                                })
                            }
                        </div>
                        <form  onSubmit={submit}>
                            <div className={styles.contentInput}>
                                <input className={styles.input} onChange={handleInput} defaultValue={inputValue} ref={inputRef} type="text" placeholder="skriv en bildtext.." />
                            </div>
                            <button className={styles.publishBtn}>publicera</button>
                        </form>    
                    </div>
                </div>
            </Zoom>   
        )
}

export default UploadPhoto


