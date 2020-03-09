import React, {useContext, useState, useEffect} from 'react'
import { userContext } from '../context/UserContext'
import useAxios from '../utils/useAxios'
import ConfirmationDialog from '../components/Dialog/ConfirmationDialog'
import { useHistory } from 'react-router-dom'
import ErrorText from '../components/ErrorText'

export default function Profile() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordAgain, setNewPasswordAgain] = useState('')
    
    const {user, token, setToken} = useContext(userContext)
    useEffect(() => {
        if (user) setUsername(user.username)
    }, [user])

    const [error, setError] = useState(null)
    const [{error: submissionError, isLoading: isSubmitting, data}, requestSubmit] = useAxios()
    const history = useHistory()

    const handleSubmit = async e => {
        e.preventDefault()
        setError(null)

        if (newPassword !== newPasswordAgain) return setError('Passwords do not match')
        if (newPassword.length < 6 && newPassword.length > 0) return setError('Password must be at least 6 characters long')

        const originalInfo = {password}
        const updatedInfo = {username, password : newPassword.length > 0 ? newPassword : password}
        requestSubmit({
            url: `/api/users/_id/${user._id}`,
            method: 'post',
            data: {
                updatedInfo, originalInfo
            },
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    }

    useEffect(() => {
        if (data) setToken(data.token)
        setIsEditing(false)
    }, [data, setToken])

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [{error: deleteError, isLoading: isDeleting, data: deleteData}, requestDelete] = useAxios()
    const deleteUser = async () => {
        requestDelete({
            url: `/api/users/_id/${user._id}`,
            method: 'delete',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    }
    useEffect(() => {
        if (deleteData) history.push('/logout')
    }, [deleteData, history])

    const [isEditing, setIsEditing] = useState(false)

    return (
        <div>
            <ConfirmationDialog open={isDialogOpen} handleClose={() => setIsDialogOpen(false)} action={deleteUser}>
                <h2>Delete user?</h2>
            </ConfirmationDialog>
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
                {error && <ErrorText>{error}</ErrorText>}
                {submissionError && <ErrorText>{submissionError}</ErrorText>}
                <div style={{textAlign: 'right'}}>
                    <button className="button-primary" disabled={isSubmitting} type="submit">{isSubmitting ? "Loading..." : 'Submit'}</button>
                    <button className="button" disabled={isSubmitting} onClick={() => setIsEditing(false)} type="button">Cancel</button>
                </div>
            </form> ) : (
                <div className="card">
                    <p><strong>Profile</strong></p>
                    <p>Username: <strong>{username}</strong></p>
                    {deleteError && <ErrorText>{deleteError}</ErrorText>}
                    <button className="button-primary" onClick={() => setIsEditing(true)} disabled={isDeleting}>Edit Profile</button>
                    <button className="button" onClick={() => setIsDialogOpen(true)} disabled={isDeleting}>Delete</button>
                </div>
            )}
        </div>
    )
}
