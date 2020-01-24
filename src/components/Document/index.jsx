import React from 'react'
import useQuery from '../../utils/useQuery'
import Previewer from '../Previewer'
import styles from './Document.module.scss'
import { Link } from 'react-router-dom'

const getDocumentQuery = `
query ($_id: ID) {
    document (_id: $_id) {
        _id
        title
        description,
        body,
        author {
            username
        }
    }
}
`

export default function Document({_id}) {
    const { isLoading, error, data } = useQuery(getDocumentQuery, { _id })
    const document = data ? data.document : null

    return (
        <div className={styles.main}>
            {isLoading ? <p>Loading...</p> : null}
            {error ? <p>{error}</p> : null}
            {document ? (
                <>
                    <nav style={{textAlign: 'right'}}>
                        <ul className="navList">
                            <li><button><Link to={`/edit/${_id}`}>Edit</Link></button></li>
                            <li><button>...</button></li>
                        </ul>
                    </nav>
                    <div>
                        <div className={styles.documentHeaderContainer}>
                            <header className={styles.documentHeader}>
                                <h2>{document.title}</h2>
                                <p>{document.author.username}</p>
                            </header>
                            <small className={styles.documentDescription}><i>{document.description}</i></small>
                        </div>
                        <Previewer source={document.body} />
                    </div>
                </>
            ) : "No document found"}
        </div>
    )
}
