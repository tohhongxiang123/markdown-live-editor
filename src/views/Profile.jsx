import React, {useContext, useState, useEffect} from 'react'
import { userContext } from '../context/UserContext'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function Profile() {
    const {user, setToken} = useContext(userContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordAgain, setNewPasswordAgain] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    useEffect(() => {
        if (user) setUsername(user.username)
    }, [user])

    const handleSubmit = async e => {
        e.preventDefault()
        setError(null)
        if (newPassword !== newPasswordAgain) return setError('Passwords do not match')

        if (newPassword.length < 6 && newPassword.length > 0) return setError('Password must be at least 6 characters long')

        const originalInfo = {password}
        const updatedInfo = {username, password : newPassword.length > 0 ? newPassword : password}

        setIsLoading(true)

        try {
            const response = await axios.post(`/api/users/_id/${user._id}`, {updatedInfo, originalInfo})
            setToken(response.token)
            history.push('/')
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
                <h2>Edit User</h2>
                <label htmlFor="username">Username</label>
                <input id="username" value={username} onChange={e => setUsername(e.target.value)} />
                <label htmlFor="newPassword">New Password</label>
                <input type="password" id="newPassword" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                <label htmlFor="newPasswordAgain">New Password Again</label>
                <input type="password" id="newPasswordAgain" value={newPasswordAgain} onChange={e => setNewPasswordAgain(e.target.value)} />
                <label htmlFor="password">Original Password</label>
                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                {error ? <p><i>{error}</i></p> : null}
                <button className="button-primary" disabled={isLoading}>{isLoading ? "Loading..." : 'Submit'}</button>
            </form>
        </div>
    )
}
