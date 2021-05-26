import React, {useEffect} from 'react'
import Zoom from '@material-ui/core/Zoom';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/UploadPhoto.module.css'

function UploadPhoto({images}) {

    useEffect(() => {
        console.log(images)
    }, [images])


    return (
        <Zoom>
        <div>
            {
                images && images.map(url =>  {
                    return <img className={styles.img} key={Math.random(1 * 100000)} src={url}></img>
                })
            }
        </div>
        </Zoom>
    )
}

export default UploadPhoto


