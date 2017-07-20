import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import { Popular } from './Popular';
import FilmDetails from './FilmDetails';
import Genres from './Genres';
import Search from './Search';

const NotFound = props => {
    return (
        <div className="not-found">
            <img src="http://alittlebit.ru/upload/iblock/c75/db1ca89821f8112b986ae36733e7560a.jpeg"/>
            <div className="">
                <div className="title">404 ERROR</div>
                <div className="description">The page you looking for cannot be found</div>
            </div>
        </div>
    )
};

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
                        <Route path='*' component={NotFound} />
                    </Switch>
                </div>
            </div>
        </Router>
)
};

module.exports = App;