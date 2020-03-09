import React from 'react'
import styles from './Dialog.module.scss'

export default function ConfirmationDialog({open, handleClose, action, children}) {
    return open ?
        <div className={styles.dialog} onClick={handleClose}>
            <div className={styles.dialogContent}>
                {children}
                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '1em'}}>
                    <button className="button-primary" onClick={action}>Yes</button>
                    <button onClick={handleClose}>No</button>
                </div>
            </div>
        </div> : null
}
