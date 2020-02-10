import React, { useState, useContext, useEffect } from 'react'
import useQuery from '../../utils/useQuery'
import Previewer from '../Previewer'
import styles from './Document.module.scss'
import { Link } from 'react-router-dom'
import ConfirmationDialog from '../Dialog/ConfirmationDialog'
import useAxios from '../../utils/useAxios'
import { useHistory } from 'react-router-dom'
import { userContext } from '../../context/UserContext'
import moment from 'moment'
import ErrorText from '../ErrorText'
import {ReactComponent as DeleteIcon} from '../../icons/delete.svg'
import {ReactComponent as AddIcon} from '../../icons/add.svg'
import {ReactComponent as EditIcon} from '../../icons/edit.svg'

const getDocumentQuery = `
query ($_id: ID) {
    document (_id: $_id) {
        _id
        title
        description
        body
        datecreated
        datemodified
        author {
            username
        }
    }
}
`

export default function Document({_id, pageid}) {
    const { isLoading, error, data } = useQuery(getDocumentQuery, { _id })
    const document = data ? data.document : null
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const history = useHistory()
    const {token} = useContext(userContext)

    const [{isLoading: isDeleting, error: deleteError, data: deleteData}, request] = useAxios()
    const deletePost = async () => {
        request({
            url: `/api/documents/_id/${_id}`,
            method: 'delete',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        setIsDialogOpen(false)
    }

    useEffect(() => {
        if (deleteData) {
            window.location.reload()
            history.push(`/pages/${pageid}`)
        }
    }, [deleteData, history, pageid])

    return (
        <div className={styles.main}>
            <ConfirmationDialog open={isDialogOpen} handleClose={() => setIsDialogOpen(false)} action={deletePost} title={"Delete post?"} />

            {error ? <ErrorText>{'What'}</ErrorText> : null}
            {isLoading ? <p>Loading...</p> : document ? (
                <>
                    <div className={styles.documentInformation}>
                        <header>
                            <h2 className={styles.documentTitle}>{document.title}</h2>
                            <p className={styles.documentDescription}>Created by <strong>{document.author.username}</strong>, last modified {moment(parseInt(document.datemodified)).format('MMMM Do YYYY, h:mm:ss a')}</p>
                            <small className={styles.documentDescription}><i>{document.description}</i></small>
                        </header>
                        <div style={{textAlign: 'center'}}>
                            <ul className={styles.documentActions}>
                                <li>
                                    <Link to={`/pages/${pageid}/create/${_id}`}>
                                        <button className="button-primary" disabled={isDeleting} style={{color: 'black'}}>
                                            <AddIcon />
                                            Create
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/pages/${pageid}/edit/${_id}`}>
                                        <button disabled={isDeleting}><EditIcon />Edit</button>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={() => setIsDialogOpen(true)} disabled={isDeleting}>
                                        <DeleteIcon />Delete
                                    </button>
                                </li>
                            </ul>
                            {deleteError && <ErrorText>{deleteError}</ErrorText>}
                        </div>
                    </div>
                    <Previewer source={document.body} />
                </>
            ) : (
                <>
                    <p>No document selected</p>
                    <div className={styles.pageActions}>
                        <Link className={`card ${styles.pageAction} ${styles.primaryPageAction}`} to={`/pages/${pageid}/create`}>
                            <AddIcon /> 
                            <p>Add a Document</p>
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}
