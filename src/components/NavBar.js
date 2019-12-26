import React from 'react'
import { Link } from 'react-router-dom'

function NavBar(props) {
    return (
        <div className='navbar navbar-expand-lg navbar-light bg-light mb-4'>
            <Link className='navbar-brand' to='/'>FanDota</Link>
            <Link className='nav-link' to='/teams'>Dota 2 Teams</Link>
            {props.loggedIn ? <Link className='nav-link' to='/myteams'>My Teams</Link> : ''}
            <Link className='nav-link mr-sm-2' to='/login'>Login</Link>
        </div>
    )
}

export default NavBar