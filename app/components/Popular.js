import React from 'react';
import { Link } from 'react-router-dom';

import api from '../utils/api';

const Types = props => {
    var types = ['top rated', 'popular', 'now playing', 'upcoming'];
    return (
        <div className="types-row">
            <ul className="types">
                {types.map(type => {
                    return (
                        <li
                            className={type === props.selectedType ? 'active' : ''}
                            key={type}
                            onClick={props.onSelect.bind(null,type)}>
                            {type}
                        </li>
                    )
                })}

            </ul>
        </div>
    )
};

const Films = props => {
    return (
        <div className="films">
            {props.films && props.films.map(film => {
                return (
                    <Link className="film" to={'/film/' + film.id} key={film.id}>
                        <div className="img-with-rating">
                            <img src={'http://image.tmdb.org/t/p/w185/' + film.poster_path}/>
                            <div className="rating">{film.vote_average}</div>
                        </div>
                        <div className="description">
                            <div className="title">{film.title}</div>
                            <div className="release">Release date: {film.release_date}</div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
};

class Popular extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedType: 'top rated',
            films: null
        };

        this.getFilms = this.getFilms.bind(this);
    }

    getFilms(type) {
        this.setState({
            selectedType: type,
            films: null
        });

        api.getFilms(type)
            .then(function(films){
                this.setState({
                    films: films
                })
            }.bind(this));
    }

    componentDidMount() {
        this.getFilms(this.state.selectedType);
    }

    render () {
        return (
            <div>
                <Types selectedType={this.state.selectedType} onSelect={this.getFilms}/>
                {!this.state.films
                    ? <div className="loading-message">Loading...</div>
                    : <Films films={this.state.films}/>}
            </div>
        )
    }
}

module.exports = { Popular, Films };