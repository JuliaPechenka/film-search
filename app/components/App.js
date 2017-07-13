import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import Popular from './Popular';

const App = props => {
    return (
        <Router>
            <div className="container">
                <Nav />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/popular' component={Popular} />
                </Switch>
            </div>
        </Router>
)
};

module.exports = App;