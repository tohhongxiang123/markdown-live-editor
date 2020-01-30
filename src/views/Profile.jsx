import React, {useContext, useState, useEffect} from 'react'
import { userContext } from '../context/UserContext'
import axios from 'axios'
import ConfirmationDialog from '../components/Dialog/ConfirmationDialog'
import { useHistory } from 'react-router-dom'

export default function Profile() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordAgain, setNewPasswordAgain] = useState('')
    
    const {user, setToken} = useContext(userContext)
    useEffect(() => {
        if (user) setUsername(user.username)
    }, [user])

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

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

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const deleteUser = async () => {
        console.log('delete')
    }

    const [isEditing, setIsEditing] = useState(false)

    return (
        <div>
            <ConfirmationDialog open={isDialogOpen} handleClose={() => setIsDialogOpen(false)} action={deleteUser} title="Delete user?"/>
            {isEditing ? (
            <form className="card" onSubmit={handleSubmit}>
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
                <div style={{textAlign: 'right'}}>
                    <button className="button-primary" disabled={isLoading} type="submit">{isLoading ? "Loading..." : 'Submit'}</button>
                    <button className="button" disabled={isLoading} onClick={() => setIsEditing(false)} type="button">Cancel</button>
                </div>
            </form> ) : (
                <div className="card">
                    <p><strong>Profile</strong></p>
                    <p>Username: <strong>{username}</strong></p>
                    <button className="button-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    <button className="button" onClick={() => setIsDialogOpen(true)}>Delete</button>
                </div>
            )}
        </div>
    )
}
