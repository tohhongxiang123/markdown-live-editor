import React, { useState } from 'react'
import styles from './Login.module.scss'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        console.log(username, password)
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Login</h2>
                <label>Username</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit" className="button-primary">Login</button>
            </form>
        </div>
    )
}
