import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { userContext } from '../context/UserContext'
import axios from 'axios'
import styles from './NavigationBar.module.scss'

export default function Navigation() {
    const {user, setToken} = useContext(userContext)

    const logout = e => {
        setToken(null)
        axios.get('/api/users/logout')
    }
    return (
        <nav className={styles.navigationBar}>
            <ul className="navList">
                <li><NavLink activeStyle={{fontWeight: 'bold'}} to="/pages"><strong>HOME</strong></NavLink></li>
                {user ? (
                    <>
                        <li><NavLink activeStyle={{fontWeight: 'bold'}} to="/create">Create</NavLink></li>
                        <li><NavLink activeStyle={{fontWeight: 'bold'}} to={`/profile/${user._id}`}>{user.username}</NavLink></li>
                        <li><button onClick={logout} href="#">Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><NavLink activeStyle={{fontWeight: 'bold'}} to="/login">Login</NavLink></li>
                        <li><NavLink activeStyle={{fontWeight: 'bold'}} to="/register">Register</NavLink></li>
                    </>
                )}
            </ul>
        </nav>
    )
}
