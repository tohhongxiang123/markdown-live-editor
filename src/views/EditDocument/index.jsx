import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import getDocument from './getDocument'
import Editor from '../../components/Editor'
import styles from './EditDocument.module.scss'
import saveDocument from './saveDocument'

const MAX_DESCRIPTION_LENGTH = 140;
const MAX_TITLE_LENGTH = 140;

export default function EditDocument() {
    const { _id, pageid } = useParams()
    const history = useHistory()
    const [document, setDocument] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetch() {
            setIsLoading(true)
            try {
                const document = await getDocument(_id)
                setDocument(document)
            } catch(e) {
                setError(e.message)
            } finally {
                setIsLoading(false)
            }
        }

        if (_id) fetch()
    }, [_id])

    const save = async ({title, body, description}) => {
        if (title.length > MAX_TITLE_LENGTH) return setError(`Title is too long (${title.length}/${MAX_TITLE_LENGTH} characters)`)
        if (description.length > MAX_DESCRIPTION_LENGTH) return setError(`Title is too long (${description.length}/${MAX_DESCRIPTION_LENGTH} characters)`)
        
        const {error} = await saveDocument(_id, {title, body, description})

        if (error) {
            return setError(error)
        }

        history.push(`/pages/${pageid}/documents/${_id}`)
    }
    
    return (
        <div className={styles.editContainer}>  
            <Editor save={save} initialDocument={document} isLoading={isLoading} error={error} />
        </div>
    )
    
}
