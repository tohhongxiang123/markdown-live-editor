import React, { useState } from 'react'
import styles from './DocumentCard.module.scss'
import { Link, useRouteMatch } from 'react-router-dom'

function shouldBeExpanded(document, activeId) {
    if (document._id === activeId) return true
    if (!document.children) return false
    if (document.children.length === 0) return false

    // if one of the child should be expanded, the parent should be expanded too
    return document.children.map(child => shouldBeExpanded(child, activeId)).some(el => el === true)
}

export default function DocumentCard({_id, title, description, author, children, activeId}) {
    const [isExpanded, setIsExpanded] = useState(shouldBeExpanded({_id, children}, activeId))
    const match = useRouteMatch()

    return (
        <li className={styles.documentCard}>
            <Link className={`${styles.documentTitle} ${_id === activeId && styles.active}`} to={`/pages/${match.params.pageid}/documents/${_id}`}>
                {children && children.length > 0 ? (
                <button onClick={() => setIsExpanded(s => !s)} className={styles.expandButton}> {!isExpanded ? "ᐳ" : "ᐯ"} </button> 
                ): <button disabled className={styles.expandButton}><strong>&#x00B7;</strong></button>}
                {_id === activeId ? <strong>{title}</strong> : <span>{title}</span>}
            </Link>
            {children && isExpanded ? (
                <ul className={styles.childrenList}>
                    {children.map(child => <DocumentCard {...child} activeId={activeId} key={child._id}/>)}
                </ul>
            ) : null}
        </li>
    )
}
