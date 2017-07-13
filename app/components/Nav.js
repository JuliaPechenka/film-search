import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = props => {
    return (
        <div className="header">
            <div className="container">
                <ul className='nav'>
                    <li>
                        <NavLink exact activeClassName='active' to='/'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='active' to='/popular'>Popular</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
};

module.exports = Nav;