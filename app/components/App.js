import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import Popular from './Popular';
import FilmDetails from './FilmDetails';

const App = props => {
    return (
        <Router>
            <div className="container">
                <Nav />
                <Switch>
                    <Route exact path='/' component={Popular} />
                    <Route path='/film/:id' component={FilmDetails} />
                </Switch>
            </div>
        </Router>
)
};

module.exports = App;