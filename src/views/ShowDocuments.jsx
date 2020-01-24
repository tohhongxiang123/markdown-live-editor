import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import DocumentList from '../components/DocumentList'
import Document from '../components/Document'
import styles from './ShowDocuments.module.scss'

export default function ShowDocuments() {
    const match = useRouteMatch()
    const {_id} = match.params


    return (
        <div className={styles.showDocuments}>
            <DocumentList />
            <Document _id={_id} key={_id} />
        </div>
    )
}
