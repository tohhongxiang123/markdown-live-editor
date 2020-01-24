import React from 'react'
import useQuery from '../../utils/useQuery'
import DocumentCard from './DocumentCard'
import styles from './DocumentList.module.scss'
import { useRouteMatch } from 'react-router-dom'

const getDocumentsQuery = `
query {
    parentDocuments {
        _id
        title
        description
        children {
            _id
            title
            description
            author {
                _id
                username
            }
        }
        author {
            _id
            username
        }
    }
}
`

export default function DocumentList() {
    const { isLoading, error, data } = useQuery(getDocumentsQuery)
    const match = useRouteMatch()
    const { _id: currentId } = match.params

    if (isLoading) return <p>Loading...</p>

    const documents = data ? data.parentDocuments : [];
    return (
        <div className={styles.documentListContainer}>
            {error ? <p>{error}</p> : null}
            <ul className={styles.documentList}>
                {documents.map(doc => <DocumentCard {...doc} key={doc._id} activeId={currentId} />)}
            </ul>
        </div>
    )
}
