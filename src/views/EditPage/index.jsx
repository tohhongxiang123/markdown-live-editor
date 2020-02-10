import React, { useEffect, useState, useContext } from 'react'
import { userContext } from '../../context/UserContext'
import useAxios from '../../utils/useAxios'
import { useParams, useHistory } from 'react-router-dom'
import ErrorText from '../../components/ErrorText'

export default function EditPage() {
    const history = useHistory()
    const { pageid } = useParams()
    const {token} = useContext(userContext)

    const [{isLoading: isFetching, data: initialData, error: fetchError}, fetch] = useAxios()
    useEffect(() => {
        fetch({
            url: `/api/pages/_id/${pageid}`,
            method: 'get'
        })
    }, [pageid, fetch])

    const [title, setTitle] = useState('')
    useEffect(() => {
        if (initialData) setTitle(initialData[0].title)
    }, [initialData])

    const [{isLoading: isSubmitting, data: submissionData, error: submissionError}, submit] = useAxios()
    const handleSubmit = async e => {
        e.preventDefault();
        submit({
            url: `/api/pages/_id/${pageid}`,
            method: 'post',
            data: {title},
            headers: {authorization: `Bearer ${token}`}
        })
    }

    useEffect(() => {
        if (submissionData) {
            history.push(`/pages/${submissionData._id}`)
        }
    }, [submissionData, history])

    return (
        <div>
            <form className="card" onSubmit={handleSubmit}>
                <h2>Edit page</h2>
                <label htmlFor="title">Title</label>
                <input id="title" value={title} onChange={e => setTitle(e.target.value)} disabled={isSubmitting || isFetching} />
                {submissionError ? <ErrorText>{submissionError}</ErrorText> : null}
                {fetchError ? <ErrorText>{fetchError}</ErrorText> : null}
                <button className="button-primary" disabled={isSubmitting || isFetching}>{isSubmitting || isFetching ? 'Loading...' : 'Confirm'}</button>
            </form>
        </div>
    )
}
