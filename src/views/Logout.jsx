import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { userContext } from '../context/UserContext'
import axios from 'axios'

export default function Logout() {
    const {setToken} = useContext(userContext)
    const history = useHistory()

    useEffect(() => {
        const logout = async () => {
            setToken(null)
            await axios.get('/api/users/logout')
            history.push('/')
        }

        logout()
    }, [history, setToken])

    return (
        <div>
            Logging out...
        </div>
    )
}
