import React, { useState } from 'react'
import styles from './DocumentCard.module.scss'
import { Link } from 'react-router-dom'

export default function DocumentCard({_id, title, description, author, children, activeId}) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className={styles.documentCard}>
            <header>
                {children && children.length > 0 ? (
                <button onClick={() => setIsExpanded(s => !s)} className={styles.expandButton}> {!isExpanded ? "ᐳ" : "ᐯ"} </button> 
                ): <button disabled className={styles.expandButton}><strong>&#x00B7;</strong></button>}
                <Link to={`/documents/${_id}`}>
                    {_id === activeId ? <strong>{title}</strong> : <span>{title}</span>}
                </Link>
            </header>
            {children && isExpanded ? (
                <ul className={styles.childrenList}>
                    {children.map(child => <li key={child._id}><DocumentCard {...child} activeId={activeId} /></li>)}
                </ul>
            ) : null}
        </div>
    )
}
