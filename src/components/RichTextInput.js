import React, {useEffect, useRef} from 'react'
import styles from './RichTextInput.module.scss'
import 'draft-js/dist/Draft.css'

const KEYCODES = {
    TAB: 9,
    ESC: 27,
    ENTER: 13
}

export default function RichTextInput({updatePreview, innerHTML}) {
    const editorRef = useRef(null)

    useEffect(() => {
        function handleSpecialKeys(e) {
            switch(e.keyCode) {
                case KEYCODES.ESC:
                    e.preventDefault()
                    editorRef.current.blur()
                    break;
                case KEYCODES.TAB:
                    e.preventDefault()
                    document.execCommand('insertText', false, '        ')
                    break
                default:
                    break
            }
        }

        editorRef.current.addEventListener('keydown', handleSpecialKeys)
        return () => editorRef.current.removeEventListener('keydown', handleSpecialKeys)
    }, [])

    return (
        <div className={styles.textInput} contentEditable onInput={updatePreview} ref={editorRef}>
        </div>
    )
}

