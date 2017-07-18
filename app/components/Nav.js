import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = props => {
    return (
        <div className="header">
            <div className="container">
                <ul className='nav'>
                    <li>
                        <NavLink exact activeClassName='active' to='/'><span className="menu-icon">&#8962;</span>Main</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='active' to='/genres'><span className="menu-icon">&#127902;</span>Genres</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
};

module.exports = Nav;