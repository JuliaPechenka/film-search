import React from 'react';
import { Link } from 'react-router-dom';

const Home = props => {
    return (
        <div className="description">
            <Link className='' to='/game'>Try it!</Link>
        </div>
    )
};

module.exports = Home;