import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

export const userContext = createContext()

export const UserProvider = ({children}) => {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const authTokenCookie = Cookies.get('auth-token')
        if (authTokenCookie) setToken(authTokenCookie)
    }, [])

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axios.get('/api/users/verify', {headers: {authorization: `Bearer ${token}`}})
                setUser(response.data)
            } catch(e) {
                setUser(null)
            }
        }

        if (token) {
            verifyToken()
        } else {
            setUser(null)
        }
    }, [token])
    
    return (
        <userContext.Provider value={{user, setToken}}>
            {children}
        </userContext.Provider>
    )
}
