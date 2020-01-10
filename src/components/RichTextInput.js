import React, {useState} from 'react'
import styles from './RichTextInput.module.scss'
import {Controlled as CodeMirror} from 'react-codemirror2'

import 'codemirror/theme/material.css';
import 'codemirror/mode/markdown/markdown'

export default function RichTextInput({updatePreview}) {
    const [editorState, setEditorState] = useState('')
    const [editor, setEditor] = useState(null)

    const options = {
        mode: 'markdown',
        theme: 'material',
        lineNumbers: true,
        lineWrapping: true,
        autofocus: true,
        highlightFormatting: true,
        fencedCodeBlockHighlighting: true
    }

    const handleChange = (editor, data, value) => {
        setEditorState(value)
        updatePreview(value)
    }

    return (
        <div className={styles.root} onClick={() => editor.focus()}>
            <CodeMirror 
            editorDidMount={editor => setEditor(editor)}
            className={styles.editor}
            value={editorState}
            options={options}
            onBeforeChange={(editor, data, value) => setEditorState(value)}
            onChange={handleChange}
            />
        </div>
    )
}