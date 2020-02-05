import React, { useState, useEffect, useContext, useMemo } from 'react'
import { userContext } from '../../context/UserContext'
import DocumentCard from './DocumentCard'
import styles from './DocumentList.module.scss'
import { Link, useHistory } from 'react-router-dom'
import {ReactComponent as DeleteIcon} from '../../icons/delete.svg'
import {ReactComponent as AddIcon} from '../../icons/add.svg'
import {ReactComponent as EditIcon} from '../../icons/edit.svg'
import ConfirmationDialog from '../Dialog/ConfirmationDialog'
import useAxios from '../../utils/useAxios'
import tryLowerCase from '../../utils/tryLowerCase'

const SORT_METHODS = {
    DATE: {
        ASC: 'DATE_ASC',
        DESC: 'DATE_DESC'
    },
    ALPHABETICAL: {
        ASC: 'ALPHABETICAL_ASC',
        DESC: 'ALPHABETICAL_DESC'
    },
}

export default function DocumentList({page, documents, activeId}) {
    const history = useHistory()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [{isLoading, error, data}, request] = useAxios()
    const {token} = useContext(userContext) 
    const [sortMethod, setSortMethod] = useState(SORT_METHODS.DATE.ASC)
    const [searchText, setSearchText] = useState('')

    const deletePage = () => {
        request({
            url: `/api/pages/_id/${page._id}`,
            method: 'delete',
            headers: {authorization: `Bearer ${token}`}
        })
    }

    useEffect(() => {
        if (data) history.push(`/pages`)
    }, [data, history])

    const sortedDocuments = useMemo(() => {
        const filteredDocuments = documents.filter(document => tryLowerCase(document.title).includes(tryLowerCase(searchText)))
        switch(sortMethod) {
            case SORT_METHODS.DATE.ASC:
                return filteredDocuments.sort((a, b) => a.datecreated < b.datecreated ? -1 : 0)
            case SORT_METHODS.DATE.DESC:
                return filteredDocuments.sort((a, b) => a.datecreated > b.datecreated ? -1 : 0)
            case SORT_METHODS.ALPHABETICAL.ASC:
                return filteredDocuments.sort((a, b) => a.title < b.title ? -1 : 0)
            case SORT_METHODS.ALPHABETICAL.DESC:
                return filteredDocuments.sort((a, b) => a.title > b.title ? -1 : 0)
            default:
                return filteredDocuments
        }
    }, [sortMethod, documents, searchText])
    
    return (
        <>
            <ConfirmationDialog open={isDialogOpen} handleClose={() => setIsDialogOpen(false)} action={deletePage} title="Delete Page?" />
            <nav className={styles.documentListContainer}>
                <header className={styles.navHeader}>
                    <p><strong>{page.title}</strong></p>
                    <input type="text" placeholder="Find document" value={searchText} onChange={e => setSearchText(e.target.value)} />
                    {isLoading ? <p>Loading...</p> : null}
                </header>
                {error ? <p style={{padding: '10px'}}>{error}</p> : null}
                <ul className={styles.documentList}>
                    {sortedDocuments.map(doc => <DocumentCard {...doc} key={doc._id} activeId={activeId} />)}
                </ul>
                <div className={styles.pageActions}>
                    <select onChange={e => setSortMethod(e.target.value)}>
                        <option value={SORT_METHODS.DATE.ASC}>Date ascending</option>
                        <option value={SORT_METHODS.DATE.DESC}>Date descending</option>
                        <option value={SORT_METHODS.ALPHABETICAL.ASC}>Alphabetical ascending</option>
                        <option value={SORT_METHODS.ALPHABETICAL.DESC}>Aphabetical descending</option>
                    </select>
                    
                    <Link to={`/pages/${page._id}/create`}><button className={`button ${styles.actionButtons}`}><AddIcon /></button></Link>
                    <Link to={`/edit/${page._id}`}><button className={`button ${styles.actionButtons}`}><EditIcon /></button></Link>
                    <button className={`button ${styles.actionButtons}`} onClick={() => setIsDialogOpen(true)}><DeleteIcon /></button>
                </div>
            </nav>
        </>
    )
}
