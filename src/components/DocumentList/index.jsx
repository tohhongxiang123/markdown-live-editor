import React, { useState } from 'react'
import DocumentCard from './DocumentCard'
import styles from './DocumentList.module.scss'
import { Link, useHistory } from 'react-router-dom'
import deleteIcon from './delete.svg'
import addIcon from './add.svg'
import Dialog from '../Dialog'
import axios from 'axios'

export default function DocumentList({page, documents, activeId}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [error, setError] = useState(null)
    const history = useHistory()

    const deletePage = async () => {
        setError(null)
        setIsDialogOpen(false)
        try {
            await axios.delete(`/api/pages/_id/${page._id}`)
            history.push(`/pages`)
        } catch(e) {
            if (e.response) {
                setError(e.response.data.error)
            } else {
                setError(e.message)
            }
        }
    }

    return (
        <>
            <Dialog open={isDialogOpen} handleClose={() => setIsDialogOpen(false)}>
                <h2>Are you sure?</h2>
                <p style={{margin: '10px 0 20px'}}>This action is <strong>irreversible</strong></p>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <button onClick={deletePage}>Yes</button>
                    <button className="button-primary" onClick={() => setIsDialogOpen(false)}>No</button>
                </div>
            </Dialog>
            <nav className={styles.documentListContainer}>
                <header className={styles.navHeader}>
                    <p><strong>{page.title}</strong></p>
                    <Link to={`/pages/${page._id}/create`}><button className={`button ${styles.actionButtons}`}><img src={addIcon} alt="Add"/></button></Link>
                    <button className={`button ${styles.actionButtons}`} onClick={() => setIsDialogOpen(true)}><img src={deleteIcon} alt="Delete" /></button>
                </header>
                {error ? <p>{error}</p> : null}
                <ul className={styles.documentList}>
                    {documents.map(doc => <DocumentCard {...doc} key={doc._id} activeId={activeId} />)}
                </ul>
            </nav>
        </>
    )
}
