import React from 'react'
import { Link } from 'react-router-dom'

function NavBar(props) {
    return (
        <div className='navbar navbar-expand-lg navbar-light bg-light mb-4'>
            <Link className='navbar-brand' to='/'>FanDota</Link>
            <Link to='/teams'>Dota 2 Teams</Link>

        </div>
    )
}

export default NavBar