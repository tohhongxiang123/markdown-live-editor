import React from 'react'
import styles from './ErrorText.module.scss'

export default function ErrorText({children}) {
    return (
        <div className={styles.errorMessage}>
            {children}
        </div>
    )
}
