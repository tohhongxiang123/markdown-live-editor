import React, {useState, useEffect, useRef} from 'react'
import styles from './Editor.module.scss'
import Previewer from '../Previewer'
import RichTextInput from './RichTextInput'
import Gutter from './Gutter'
import splitBlocks from './splitBlocks'
import ErrorText from '../ErrorText'

const MAX_DESCRIPTION_LENGTH = 140;
const MAX_TITLE_LENGTH = 140;

/**
 * 
 * @param {Object} props 
 * @param {string} text - Text for the editor
 * @param {function} save - Function to call when save is clicked
 * @param {function} updateText - Function to call when text is updated
 */
export default function Editor({initialDocument, save, isLoading, error}) {
    const [body, setBody] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (initialDocument) {
            setBody(initialDocument.body)
            setTitle(initialDocument.title)
            setDescription(initialDocument.description)
        }
    }, [initialDocument])

    const updateText = text => {
        setBody(text)
    }

    const [isEditorShown, setIsEditorShown] = useState(true)
    const toggleEditor = () => {
        setIsEditorShown(p => !p);
    }

    const [isPreviewShown, setIsPreviewShown] = useState(true)
    const togglePreview = () => {
        setIsPreviewShown(p => !p);
    }

    const toggleBoth = () => {
        if (isEditorShown === isPreviewShown) {
            setIsEditorShown(true)
            setIsPreviewShown(false)
            return
        }

        setIsEditorShown(p => !p);
        setIsPreviewShown(p => !p);
        return
    }

    // handling display when you toggle the previewer or editor
    const rootContainerStyles = (() => {
        let gtc;
        if (isEditorShown && isPreviewShown) {
            gtc = '1fr 1fr auto'
        } else if (isEditorShown && !isPreviewShown) {
            gtc = '1fr auto'
        } else if (!isEditorShown && isPreviewShown) {
            gtc = '1fr auto'
        } else {
            gtc = 'auto'
        }

        return {
            display: 'grid',
            gridTemplateColumns: gtc,
            justifyContent: 'stretch',
            height: '100vh',
            borderTop: '1px solid #ccc',
            overflow: 'hidden',
            position: 'relative'
        }
    })()

    const editorContainerRef = useRef(null)
    const [editorWidth, setEditorWidth] = useState(500)
    useEffect(() => {
        function handleWindowResize() {
            setEditorWidth(editorContainerRef.current.clientWidth)
        }
        if (editorContainerRef.current) {
            window.addEventListener('resize', handleWindowResize)
        }

        return () => window.removeEventListener('resize', handleWindowResize)
    }, [editorContainerRef])

    const previewBlocks = splitBlocks(body).map((block, index) => <Previewer source={block} key={index} />)
    return (
        <>
        <header className={styles.editHeader}>
            <div>
                <input 
                    value={title} 
                    className={styles.titleInput}
                    placeholder="Title" 
                    onChange={e => {
                        if (e.target.value.length <= MAX_TITLE_LENGTH) setTitle(e.target.value)
                    }}
                    disabled={isLoading}
                />
                <p className={styles.helperText}>{title.length}/{MAX_TITLE_LENGTH} characters</p>
                <input 
                    value={description} 
                    className={styles.descriptionInput} 
                    placeholder="Description"  
                    onChange={e => {
                        if (e.target.value.length <= MAX_DESCRIPTION_LENGTH) setDescription(e.target.value)
                    }}
                    disabled={isLoading}
                />
                <p className={styles.helperText}>{description.length}/{MAX_DESCRIPTION_LENGTH} characters</p>
            </div>
            <div>
                {error ? <ErrorText>{error}</ErrorText> : null}
                <button className='button-primary' onClick={() => save({title, body, description})} disabled={isLoading}>{isLoading ? 'Loading...' : 'Publish'}</button>
            </div>
        </header>
            <div style={rootContainerStyles}>
                    <div className={`${styles.scrollContainer} ${styles.editorContainer} ${isEditorShown || styles.hidden}`} ref={editorContainerRef}>
                        <div className={styles.editorSectionHeader}>
                            <p>MARKDOWN</p>
                        </div>
                        <RichTextInput updateText={updateText} toggleState={`${isPreviewShown} ${isEditorShown} ${editorWidth}`} text={body} />
                    </div>
                    <div className={`${styles.scrollContainer} ${styles.previewerContainer} ${isPreviewShown || styles.hidden}`}>
                        <div className={styles.editorSectionHeader}>
                            <p>PREVIEW</p>
                        </div>
                        <div>
                            {previewBlocks}
                        </div>
                    </div>
                <Gutter 
                    toggleEditor={toggleEditor} 
                    togglePreview={togglePreview} 
                    isEditorShown={isEditorShown} 
                    isPreviewShown={isPreviewShown}
                    toggleBoth={toggleBoth}
                    save={() => save({title, description, body})}
                />
            </div>
        </>
    )
}
