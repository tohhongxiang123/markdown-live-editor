import React from 'react'
import styles from './Dialog.module.scss'

export default function ConfirmationDialog({open, handleClose, action, title}) {
    return open ?
        <div className={styles.dialog} onClick={handleClose}>
            <div className={styles.dialogContent}>
                <h2>{title}</h2>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <button onClick={action}>Yes</button>
                    <button className="button-primary" onClick={handleClose}>No</button>
                </div>
            </div>
        </div> : null
}
