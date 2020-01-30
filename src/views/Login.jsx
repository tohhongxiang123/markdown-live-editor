import React, { useState, useContext } from 'react'
import { userContext } from '../context/UserContext'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

export default function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const {user, setToken} = useContext(userContext)

    const handleSubmit = async e => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)
        try {
            const response = await axios.post('/api/users/login', {username, password})
            setToken(response.data.token)
        } catch(e) {
            if (e.response) {
                setError(e.response.data.error)
            } else {
                setError(e.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const { from } = props.location.state || { from: { pathname: '/' }}

    if (user) return <Redirect to={from} />

    return (
        <div>
            <form onSubmit={handleSubmit} className="form">
                <h2>Login</h2>
                <label>Username</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                {error ? <p>{error}</p> : null}
                <button 
                    type="submit" 
                    className="button-primary" 
                    disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Submit'}
                </button>
            </form>
        </div>
    )
}
