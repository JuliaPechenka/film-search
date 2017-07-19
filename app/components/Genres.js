import React from 'react';
import { Link } from 'react-router-dom';

import { Films } from './Popular';
import api from '../utils/api';

const GenresList = props => {
    return (
        <ul className="genres-list">
            {props.genres.map( genre => {
                return (
                    <li
                        className={genre.id === props.selectedGenreId ? 'active' : ''}
                        onClick={props.onSelect.bind(null, genre.id)}
                        key={genre.id}>
                        <div>{genre.id === props.selectedGenreId && <span className="check-mark">&#10004;</span>}{genre.name}</div>
                    </li>
                )
            })}
        </ul>
    )
};

class Genres extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            genres: [],
            selectedGenreId: null,
            films: []
        };

        this.getFilmsByGenre = this.getFilmsByGenre.bind(this);
    }

    componentDidMount() {
        api.getGenres()
            .then(function(genres){
                this.setState({
                    genres: genres
                }, function(){
                    this.getFilmsByGenre(this.state.genres[0].id);
                })
            }.bind(this));
    }

    getFilmsByGenre(genreId) {
        this.setState({
            selectedGenreId: genreId
        });

        api.getFilmsByGenre(genreId)
            .then(function(films){
                this.setState({
                    films: films
                })
            }.bind(this));
    }

    render () {
        return (
            <div className="paddingTop">
                <GenresList genres={this.state.genres} selectedGenreId={this.state.selectedGenreId} onSelect={this.getFilmsByGenre}/>

                {!this.state.films
                    ? <div className="loading-message">Loading...</div>
                    : <Films films={this.state.films}/>}
            </div>
        )
    }
}

module.exports = Genres;