import React, { useState } from 'react'
import useQuery from '../../utils/useQuery'
import Previewer from '../Previewer'
import styles from './Document.module.scss'
import { Link } from 'react-router-dom'
import Dialog from '../Dialog'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

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

    const deletePost = async () => {
        await axios.delete(`/api/documents/_id/${_id}`)
        setIsDialogOpen(false)
        window.location.reload()
        history.push(`/pages/${pageid}`)
    }

    return (
        <div className={styles.main}>
            <Dialog open={isDialogOpen} handleClose={() => setIsDialogOpen(false)}>
                <h2>Are you sure?</h2>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <button onClick={deletePost}>Yes</button>
                    <button className="button-primary" onClick={() => setIsDialogOpen(false)}>No</button>
                </div>
            </Dialog>

            {error ? <p>{error}</p> : null}
            {isLoading ? <p>Loading...</p> : document ? (
                <>
                    <div>
                        <div className={styles.documentHeaderContainer}>
                            <header>
                                <h2 className={styles.documentTitle}>{document.title}</h2>
                                <p className={styles.documentDescription}>Created by <strong>{document.author.username}</strong>, last modified {moment(parseInt(document.datemodified)).format('MMMM Do YYYY, h:mm:ss a')}</p>
                                <small className={styles.documentDescription}><i>{document.description}</i></small>
                            </header>
                            <ul className={styles.documentActions}>
                                <li><Link to={`/pages/${pageid}/create/${_id}`}><button className="button-primary">Create</button></Link></li>
                                <li><Link to={`/pages/${pageid}/edit/${_id}`}><button>Edit</button></Link></li>
                                <li><button onClick={() => setIsDialogOpen(true)}>Delete</button></li>
                            </ul>
                        </div>
                        <Previewer source={document.body} />
                    </div>
                </>
            ) : "No document found"}
        </div>
    )
}
