import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import DocumentList from '../components/DocumentList'
import Document from '../components/Document'
import styles from './ShowDocuments.module.scss'
import useQuery from '../utils/useQuery'
import ErrorText from '../components/ErrorText'

const getPageDocumentsQuery = `
query ($pageId: ID) {
    pageDocuments (pageId: $pageId) {
        _id
        title
        documents {
            _id
            title
            datecreated
            children {
                _id
                title
                datecreated
                children {
                    _id
                    title
                    datecreated
                    children {
                        _id
                        title
                        datecreated
                    }
                }
            }
        }
    }
}
`

export default function ShowDocuments() {
    const match = useRouteMatch()
    const {_id, pageid} = match.params
    const {isLoading, error, data} = useQuery(getPageDocumentsQuery, {pageId: pageid})
    const documents = data ? data.pageDocuments[0].documents : []
    const page = isLoading ? {title: 'Loading...'} : data ? data.pageDocuments[0] : {title: 'No page found'}

    return (
        <div className={styles.showDocuments}>
            <DocumentList page={page} documents={documents} activeId={_id} />
            <div style={{overflow: 'auto'}}>
                {error && <ErrorText>{error}</ErrorText>}
                <Document _id={_id} pageid={pageid} key={_id} />
            </div>
        </div>
    )
}
