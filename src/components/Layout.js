import React, {useState} from 'react'
import styles from './Layout.module.scss'
import Previewer from './Previewer'
import RichTextInput from './RichTextInput'
import Gutter from './Gutter'
import { ScrollSync , ScrollSyncPane } from 'react-scroll-sync'

export default function Layout() {
    const [text, setText] = useState('');

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
            justifyContent: 'stretch'
        }
    }

    return (
        <ScrollSync className={styles.root}>
            <div style={rootContainerStyles()}>
                <ScrollSyncPane>
                    <div className={`${styles.scrollContainer} ${styles.editorContainer}`} style={{display: isEditorShown ? 'block' : 'none'}}>
                        <RichTextInput updatePreview={updatePreview} />
                    </div>
                </ScrollSyncPane>
                <ScrollSyncPane>
                    <div className={`${styles.scrollContainer} ${styles.previewerContainer}`} style={{display: isPreviewShown ? 'block' : 'none'}}>
                        <Previewer source={text} />
                    </div>
                </ScrollSyncPane>
                <Gutter 
                    toggleEditor={toggleEditor} 
                    togglePreview={togglePreview} 
                    isEditorShown={isEditorShown} 
                    isPreviewShown={isPreviewShown}
                />
            </div>
        </ScrollSync>
    )
}
