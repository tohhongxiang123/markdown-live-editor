import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { userContext } from '../context/UserContext'

export default function PrivateRoute({children, ...props}) {
    const {user} = useContext(userContext)

    return (
        <Route {...props}>
            {user ? children : <Redirect to={{pathname: '/login', state: { from: props.location }}}/>}
        </Route>
    )
}
