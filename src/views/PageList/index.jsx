import React, { useContext } from 'react'
import useQuery from '../../utils/useQuery'
import PageCard from './PageCard'
import styles from './PageList.module.scss'
import { userContext } from '../../context/UserContext'
import { Link } from 'react-router-dom'

const getPages = `
query ($userid: ID) {
    userPages(userid: $userid) {
        _id
        title
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

export default function PageList() {
    const {user} = useContext(userContext)
    const {isLoading, data, error} = useQuery(getPages, {userid: user ? user._id : null})
    const pages = data ? data.userPages : []

    if (isLoading) return <p>Loading...</p>
    return (
        <div className={styles.root}>
            <h2>Pages</h2>
            {error ? <p><i>{error}</i></p> : null}
            <div className={styles.pageContainer}>
                {pages.map(page => <Link key={page._id} to={`/pages/${page._id}/documents`}><PageCard title={page.title} documents={page.documents} author={page.author} /></Link>)}
            </div>
        </div>
    )
}
