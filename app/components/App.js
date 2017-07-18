import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import { Popular } from './Popular';
import FilmDetails from './FilmDetails';
import Genres from './Genres';

const App = props => {
    return (
        <Router>
            <div>
                <Nav />

                <div className="container">
                    <Switch>
                        <Route exact path='/' component={Popular} />
                        <Route path='/film/:id' component={FilmDetails} />
                        <Route path='/genres' component={Genres} />
                    </Switch>
                </div>
            </div>
        </Router>
)
};

module.exports = App;