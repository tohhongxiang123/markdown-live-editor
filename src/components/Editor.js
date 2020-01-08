import React, {useState, useEffect, useRef} from 'react'
import styles from './Editor.module.scss'
import Previewer from './Previewer'
import RichTextInput from './RichTextInput'

export default function Editor() {
    const [text, setText] = useState('');
    const previewerRef = useRef(null);

    const updatePreview = e => {
        setText(e.target.innerText)
    }

    useEffect(() => {
        console.log(previewerRef.current.innerHTML)
    })

    return (
        <div className={styles.root}>
            <div className={styles.toolbar}>
                Toolbar ?
            </div>
            <div className={styles.allText}>
                <RichTextInput updatePreview={updatePreview}/>
                <div 
                    className={`${styles.preview} ${styles.container}`}
                    ref={previewerRef}
                >
                    <Previewer source={text} />
                </div>
            </div>
        </div>
    )
}
