import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import { Popular } from './Popular';
import FilmDetails from './FilmDetails';
import Genres from './Genres';
import Search from './Search';

const App = props => {
    return (
        <Router>
            <div>
                <Route path='/' component={Nav} />

                <div className="container">
                    <Switch>
                        <Route exact path='/' component={Popular} />
                        <Route path='/film/:id' component={FilmDetails} />
                        <Route path='/genres' component={Genres} />
                        <Route path='/search' component={Search} />
                    </Switch>
                </div>
            </div>
        </Router>
)
};

module.exports = App;