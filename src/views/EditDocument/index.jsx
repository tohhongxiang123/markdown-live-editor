import React, { useEffect, useState, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import getDocument from './getDocument'
import Editor from '../../components/Editor'
import styles from './EditDocument.module.scss'
import saveDocument from './saveDocument'

export default function EditDocument() {
    const { _id } = useParams()
    const history = useHistory()
    const [document, setDocument] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const documentTitleRef = useRef(null)
    const documentDescriptionRef = useRef(null)

    useEffect(() => {
        async function fetch() {
            setIsLoading(true)
            try {
                const fetchedDocument = await getDocument(_id)
                setDocument(fetchedDocument)
            } catch(e) {
                setError(e.message)
            } finally {
                setIsLoading(false)
            }
        }

        if (_id) fetch()
    }, [_id])

    const save = async text => {
        const title = documentTitleRef.current.innerText;
        const description = documentDescriptionRef.current.innerText;
        await saveDocument(_id, {title, body: text, description})
        history.push(`/documents/${_id}`)
    }

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    if (document) {
        return (
            <div className={styles.editContainer}>  
                <header className={styles.editHeader}>
                    <h1 contentEditable ref={documentTitleRef}>{document.title}</h1>
                    <p contentEditable ref={documentDescriptionRef}>{document.description}</p>
                </header>
                <Editor initialText={document.body} save={save}/>
            </div>
        )
    } else {
        return <p>No document found</p>
    }
    
}
