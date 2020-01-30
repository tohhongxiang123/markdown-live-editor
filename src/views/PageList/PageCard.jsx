import React from 'react'
import styles from './PageCard.module.scss'

export default function PageCard({title, documents, author}) {
    return (
        <div className={styles.pageCard}>
            <header>
                <p className={styles.pageTitle}><strong>{title}</strong></p>
            </header>
            <footer>
                <p className={styles.footerParagraph}><i>{documents.length} {documents.length === 1 ? 'document' : 'documents'}</i></p>
                <p className={styles.footerParagraph}><strong>{author.username}</strong></p>
            </footer>
        </div>
    )
}
