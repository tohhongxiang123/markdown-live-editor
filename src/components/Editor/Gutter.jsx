import React from 'react'
import styles from './Gutter.module.scss'

export default function Gutter({toggleEditor, togglePreview, isEditorShown, isPreviewShown, toggleBoth, save}) {
    return (
        <ul className={styles.root}>
            {isPreviewShown ? <li><button className={styles.button} onClick={toggleEditor}>{isEditorShown ? '<' : '>'}</button></li> : null}
            {isEditorShown ? <li><button className={styles.button} onClick={togglePreview}>{isPreviewShown ? '>' : '<'}</button></li> : null}
            <li><button className={styles.button} onClick={toggleBoth}>Toggle</button></li>
            <li><button className={styles.button} onClick={save}>Save</button></li>
        </ul>
    )
}
