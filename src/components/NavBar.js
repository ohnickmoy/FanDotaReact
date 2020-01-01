import React from 'react'
import { Link } from 'react-router-dom'

function NavBar(props) {
    return (
        <div className='navbar navbar-expand-lg navbar-light bg-light mb-4'>
            <Link className='navbar-brand' to='/'>FanDota</Link>
            <Link className='nav-link' to='/teams'>Dota 2 Teams</Link>
            {props.currentUser ? <Link className='nav-link' to='/myteams'>My Teams</Link> : ''}
            <Link onClick={() => props.setUser(null)} className='nav-link' to='/login'>{props.currentUser ? 'Logout':'Login'}</Link>
            <Link className='nav-link' to='/signup'>Sign Up</Link>
            {props.currentUser ? <span className='navbar-text text-dark'>{props.currentUser.data.attributes.username}</span> : ''}
        </div>
    )
}

export default NavBar