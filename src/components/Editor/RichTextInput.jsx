import React, {useState, useEffect} from 'react'
import styles from './RichTextInput.module.scss'
import {Controlled as CodeMirror} from 'react-codemirror2'

import 'codemirror/theme/duotone-light.css';
import 'codemirror/mode/markdown/markdown'

// toggle state is a combination of the isEditorShown and isPreviewShown
// if either one changes, toggleState will change
/**
 * 
 * @param {*} props 
 * @param {function} props.updatePreview
 * @param {string} props.toggleState - A combination of isEditorShown state and isPreviewShown state 
 */
export default function RichTextInput({updateText, toggleState, text}) {
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
            value={text}
            options={options}
            onBeforeChange={(editor, data, value) => updateText(value)}
            onChange={(editor, data, value) => updateText(value)}
            />
        </div>
    )
}