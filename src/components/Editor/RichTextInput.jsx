import React, {useState, useEffect} from 'react'
import styles from './RichTextInput.module.scss'
import {Controlled as CodeMirror} from 'react-codemirror2'

import 'codemirror/theme/material.css';
import 'codemirror/mode/markdown/markdown'

// toggle state is a combination of the isEditorShown and isPreviewShown
// if either one changes, toggleState will change
/**
 * 
 * @param {*} props 
 * @param {function} props.updatePreview
 * @param {string} props.toggleState - A combination of isEditorShown state and isPreviewShown state 
 */
export default function RichTextInput({updatePreview, toggleState, initialText}) {
    const [editorState, setEditorState] = useState(initialText ? initialText : '')
    const [editor, setEditor] = useState(null) // editor instance

    const options = {
        mode: 'markdown',
        theme: 'material',
        lineNumbers: true,
        lineWrapping: true,
        indentWithTabs: true,
        smartIndent: true,
        autofocus: true,
        highlightFormatting: true,
        fencedCodeBlockHighlighting: true
    }

    const handleChange = (editor, data, value) => {
        setEditorState(value)
    }

    useEffect(() => {
        const timeoutHandler = setTimeout(() => {
            updatePreview(editorState)
        }, editorState.length / 100)
        return () => {
            clearTimeout(timeoutHandler)
        };
    }, [editorState, updatePreview])

    useEffect(() => {
        if (editor) {
            editor.refresh()
        }
    }, [toggleState, editor])

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