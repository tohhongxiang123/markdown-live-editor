import React, {useState, useEffect} from 'react'
import styles from './RichTextInput.module.scss'
import MonacoEditor from '@uiw/react-monacoeditor';

// toggle state is a combination of the isEditorShown and isPreviewShown and container width
// if any one changes, toggleState will change
/**
 * 
 * @param {*} props 
 * @param {function} props.updatePreview
 * @param {string} props.toggleState - A combination of isEditorShown state and isPreviewShown state 
 */
export default function RichTextInput({updateText, toggleState, text}) {
    const [editor, setEditor] = useState(null)

    useEffect(() => {
        if (editor) editor.getModel().updateOptions({ tabSize: 4 })
    })

    useEffect(() => {
        if (editor) {
            // console.log(toggleState, editor)
            editor.layout({width: 0})
            editor.layout()
        }
    }, [toggleState, editor])

    const options = {
        autoIndent: 'full',
        selectOnLineNumbers: true,
        theme: 'vs-dark',
        fontLigatures: true,
        quickSuggestions: false,
        minimap: {
            enabled: false
        },
        wrappingIndent: 'same'
    }

    return (
        <div className={styles.root}>
            <MonacoEditor
                width={"100%"}
                language="javascript"
                onChange={updateText}
                value={text}
                options={options}
                editorDidMount={(editor, monaco) => setEditor(editor)}
            />
        </div>
    )
}