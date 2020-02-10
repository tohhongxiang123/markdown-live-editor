import React, { useContext, useState, useMemo } from 'react'
import useQuery from '../../utils/useQuery'
import PageCard from './PageCard'
import styles from './PageList.module.scss'
import tryLowerCase from '../../utils/tryLowerCase'
import { userContext } from '../../context/UserContext'
import { Link } from 'react-router-dom'
import ErrorText from '../../components/ErrorText'

const getPages = `
query ($userid: ID) {
    userPages(userid: $userid) {
        _id
        title
        datecreated
        author {
            _id
            username
        }
        documents {
            _id
            title
        }
    }
}
`

const SORT_METHODS = {
    DATE: {
        ASC: 'DATE_ASC',
        DESC: 'DATE_DESC'
    },
    ALPHABETICAL: {
        ASC: 'ALPHABETICAL_ASC',
        DESC: 'ALPHABETICAL_DESC'
    },
    DOCUMENTS: {
        ASC: 'DOCUMENTS_ASC',
        DESC: 'DOCUMENTS_DESC'
    }
}

export default function PageList() {
    const {user} = useContext(userContext)
    const {isLoading, data, error} = useQuery(getPages, {userid: user ? user._id : null})
    const pages = data ? data.userPages : []
    const [sortMethod, setSortMethod] = useState(SORT_METHODS.DATE.ASC)
    const [searchText, setSearchText] = useState('')

    const sortedAndFilteredPages = useMemo(() => {
        const filteredPages = pages.filter(page => tryLowerCase(page.title).includes(tryLowerCase(searchText)))

        switch(sortMethod) {
            case SORT_METHODS.DATE.ASC:
                return filteredPages.sort((a, b) => a.datecreated < b.datecreated ? -1 : 0)
            case SORT_METHODS.DATE.DESC:
                return filteredPages.sort((a, b) => a.datecreated > b.datecreated ? -1 : 0)
            case SORT_METHODS.ALPHABETICAL.ASC:
                return filteredPages.sort((a, b) => a.title < b.title ? -1 : 0)
            case SORT_METHODS.ALPHABETICAL.DESC:
                return filteredPages.sort((a, b) => a.title > b.title ? -1 : 0)
            case SORT_METHODS.DOCUMENTS.ASC:
                return filteredPages.sort((a, b) => a.documents.length < b.documents.length ? -1 : 0)
            case SORT_METHODS.DOCUMENTS.DESC:
                return filteredPages.sort((a, b) => a.documents.length > b.documents.length ? -1 : 0)
            default:
                return filteredPages
        }
    }, [sortMethod, pages, searchText])

    if (isLoading) return <p>Loading...</p>
    return (
        <div className={styles.root}>
            <header className={styles.pageListHeader}>
                <h2>Pages</h2>
                <input type="text" placeholder="Find page" value={searchText} onChange={e => setSearchText(e.target.value)} />
                <select onChange={e => setSortMethod(e.target.value)}>
                    <option value={SORT_METHODS.DATE.ASC}>Date ascending</option>
                    <option value={SORT_METHODS.DATE.DESC}>Date descending</option>
                    <option value={SORT_METHODS.ALPHABETICAL.ASC}>Alphabetical ascending</option>
                    <option value={SORT_METHODS.ALPHABETICAL.DESC}>Aphabetical decsending</option>
                    <option value={SORT_METHODS.DOCUMENTS.ASC}>Number of documents ascending</option>
                    <option value={SORT_METHODS.DOCUMENTS.DESC}>Number of documents descending</option>
                </select>
            </header>
            {error ? <ErrorText>{error}</ErrorText> : null}
            <div className={styles.pageContainer}>
                {sortedAndFilteredPages.map(page => <Link key={page._id} to={`/pages/${page._id}/documents`}><PageCard title={page.title} documents={page.documents} author={page.author} /></Link>)}
            </div>
        </div>
    )
}


