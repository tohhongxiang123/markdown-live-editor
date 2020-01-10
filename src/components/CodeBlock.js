import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedlight, okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styles from './CodeBlock.module.scss'



export default function CodeBlock({language, value}) {
    const theme = 'dark'

    const rootStyle = {
        backgroundColor: theme === 'light' ? '#fdf6e3' : '#272822',
        padding: '0 10px 5px 0',
        borderRadius: '5px',
        maxWidth: '100%',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word'
    }

    const footerStyle = {
        color: theme === 'light' ? '#121212' : '#fafafa',
        textAlign: 'right'
    }

    return (
        <div style={rootStyle}>
            <SyntaxHighlighter language={language} style={theme === 'light' ? solarizedlight : okaidia} className={styles.code}>
                {value}
            </SyntaxHighlighter>
            <div style={footerStyle}>
                <small><em>{language}</em></small>
            </div>
        </div>
    )
}
