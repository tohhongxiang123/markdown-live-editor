import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigation() {
    return (
        <nav>
            <ul className="navList">
                <li><Link to="/documents">Home</Link></li>
                <li><Link to="/create">Create</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    )
}
