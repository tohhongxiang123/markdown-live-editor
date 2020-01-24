import React, {useState} from 'react'
import styles from './Editor.module.scss'
import Previewer from '../Previewer'
import RichTextInput from './RichTextInput'
import Gutter from './Gutter'
import { ScrollSync , ScrollSyncPane } from 'react-scroll-sync'

/**
 * 
 * @param {Object} props 
 * @param {string} initialText - Initial text the editor begins with
 * @param {function} save - Function to call when save is clicked 
 */
export default function Editor({initialText, save}) {
    const [text, setText] = useState(initialText);

    const updatePreview = text => {
        setText(text)
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

    const rootContainerStyles = () => {
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
            height: '100%'
        }
    }

    return (
        <>
        <ScrollSync className={styles.root}>
            <div style={rootContainerStyles()}>
                <ScrollSyncPane>
                    <div className={`${styles.scrollContainer} ${styles.editorContainer}`} style={{display: isEditorShown ? 'block' : 'none'}}>
                        <RichTextInput updatePreview={updatePreview} toggleState={`${isPreviewShown} ${isEditorShown}`} initialText={initialText} />
                    </div>
                </ScrollSyncPane>
                <ScrollSyncPane>
                    <div className={`${styles.scrollContainer} ${styles.previewerContainer}`} style={{display: isPreviewShown ? 'block' : 'none'}}>
                        {isPreviewShown ? <Previewer source={text} /> : null}
                    </div>
                </ScrollSyncPane>
                <Gutter 
                    toggleEditor={toggleEditor} 
                    togglePreview={togglePreview} 
                    isEditorShown={isEditorShown} 
                    isPreviewShown={isPreviewShown}
                    toggleBoth={toggleBoth}
                    save={() => save(text)}
                />
            </div>
        </ScrollSync>
        </>
    )
}
