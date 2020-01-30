import React from 'react'
import styles from './Dialog.module.scss'

export default function Dialog({open, children, handleClose}) {
    return open ?
        <div className={styles.dialog} onClick={handleClose}>
            <div className={styles.dialogContent}>
                {children} 
            </div>
        </div> : null
}