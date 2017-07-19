import React from 'react';
import { Films } from './Popular';

import api from '../utils/api';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: this.props.location.search.split('=')[1].replace('%20', ' '),
            searchFilms: null
        };

        this.searchFilms = this.searchFilms.bind(this);
    }

    searchFilms(query) {
        api.searchFilm(query)
            .then(function(films) {
                setTimeout(function() {
                    this.setState({
                        searchFilms: films
                    })
                }.bind(this), 500);
                // this.setState({
                //     searchFilms: films
                // })
            }.bind(this));
    }

    componentDidMount() {
        this.searchFilms(this.state.searchQuery);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            searchQuery: newProps.location.search.split('=')[1],
            searchFilms: null
        }, function() {
            this.searchFilms(this.state.searchQuery);
        });
    }

    render() {
        return (
            <div className="paddingTop">
                <div className="page-title">Search results</div>
                {this.state.searchFilms ?
                    (this.state.searchFilms.length !== 0 ?
                        <Films films={this.state.searchFilms}/> :
                        <div>There are no results that match your search.</div> ) :
                    <div className="loading-message">Loading...</div>
                }
            </div>
        )
    }
}

module.exports = Search;