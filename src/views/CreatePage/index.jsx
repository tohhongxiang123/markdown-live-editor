import React, { useState, useEffect, useContext } from 'react'
import useAxios from '../../utils/useAxios'
import { useHistory } from 'react-router-dom'
import { userContext } from '../../context/UserContext'
import ErrorText from '../../components/ErrorText'

export default function CreatePage() {
    const history = useHistory()
    const [{isLoading, data, error}, request] = useAxios()
    const [title, setTitle] = useState('')
    const {user} = useContext(userContext)

    const handleSubmit = async e => {
        e.preventDefault();
        request({
            url: '/api/pages',
            method: 'post',
            data: {title, authorid: user._id}
        })
    }

    useEffect(() => {
        if (data) {
            history.push(`/pages/${data._id}`)
        }
    }, [data, history])

    return (
        <div>
            <form className="card" onSubmit={handleSubmit}>
                <h2>Create a new page</h2>
                <label htmlFor="title">Title</label>
                <input id="title" value={title} onChange={e => setTitle(e.target.value)} />
                {error ? <ErrorText>{error}</ErrorText> : null}
                <button className="button-primary" disabled={isLoading}>{isLoading ? 'Loading...' : 'Create Page'}</button>
            </form>
        </div>
    )
}
