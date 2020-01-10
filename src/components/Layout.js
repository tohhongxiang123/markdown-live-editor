import React, {useState} from 'react'
import styles from './Layout.module.scss'
import Previewer from './Previewer'
import RichTextInput from './RichTextInput'
import Gutter from './Gutter'
import { ScrollSync , ScrollSyncPane } from 'react-scroll-sync'

export default function Layout() {
    const [text, setText] = useState('');

    const updatePreview = text => {
        console.log(text)
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
            gtc = '1fr auto 1fr'
        } else if (isEditorShown && !isPreviewShown) {
            gtc = '1fr auto'
        } else if (!isEditorShown && isPreviewShown) {
            gtc = 'auto 1fr'
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
                {isEditorShown ? (
                    <ScrollSyncPane>
                        <div className={`${styles.scrollContainer} ${styles.editorContainer}`}>
                            <RichTextInput updatePreview={updatePreview} />
                        </div>
                    </ScrollSyncPane>
                ) : null}
                <Gutter 
                    toggleEditor={toggleEditor} 
                    togglePreview={togglePreview} 
                    isEditorShown={isEditorShown} 
                    isPreviewShown={isPreviewShown}
                />
                {isPreviewShown ? (
                    <ScrollSyncPane>
                        <div className={`${styles.scrollContainer} ${styles.previewerContainer}`}>
                            <Previewer source={text} />
                        </div>
                    </ScrollSyncPane>
                ) : null}
            </div>
        </ScrollSync>
    )
}
