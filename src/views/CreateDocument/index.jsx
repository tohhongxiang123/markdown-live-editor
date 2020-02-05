import React, { useState, useContext } from 'react'
import {userContext} from '../../context/UserContext'
import { useParams, useHistory } from 'react-router-dom'
import Editor from '../../components/Editor'
import styles from '../EditDocument/EditDocument.module.scss'
import createDocument from './createDocument'

export default function CreateDocument() {
    const params = useParams()
    const history = useHistory()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const {user, token} = useContext(userContext)

    const save = async ({title, body, description}) => {
        const childof = params._id ? params._id : null;
        const authorid = user._id;
        const pageid = params.pageid ? params.pageid : null;

        setIsLoading(true)
        setError(null)

        const {data: document, error} = await createDocument({title, description, body, childof, authorid, pageid}, {authorization: `Bearer ${token}`})

        if (error) {
            setIsLoading(false)
            setError(error)
            return
        }

        history.push(`/pages/${pageid}/documents/${document._id}`)
    }
    
    return (
        <div className={styles.editContainer}>  
            <Editor save={save} isLoading={isLoading} error={error}  />
        </div>
    )
}
