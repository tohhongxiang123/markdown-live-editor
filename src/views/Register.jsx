import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')
    const [error, setError] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    const handleSubmit = async e => {
        e.preventDefault()
        setError(null)

        if (password !== passwordAgain) return setError('Passwords do not match')
        if (password.length < 6 && password.length > 0) return setError('Password must be at least 6 characters long')
        const userInfo = {username, password}

        setIsLoading(true)
        try {
            await axios.post('/api/users/register', userInfo)
            history.push('/login')
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

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <label htmlFor="username">Username</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} id="username" />
                <label htmlFor="password">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} id="password" />
                <label htmlFor="passwordAgain">Password again</label>
                <input type="password" value={passwordAgain} onChange={e => setPasswordAgain(e.target.value)} id="passwordAgain" />
                {error ? <p>{error}</p> : null}
                <button type="submit" className="button-primary" disabled={isLoading}>{isLoading ? 'Loading...' : 'Submit'}</button>
            </form>
        </div>
    )
}
