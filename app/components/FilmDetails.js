import React from 'react';
import { Link } from 'react-router-dom';

import api from '../utils/api';

class FilmDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            film: {}
        };
    }

    getFilmDetails(id) {
        api.getFilmDetails(id)
            .then(function(film){
                console.log(film);
                this.setState({
                    film: film
                })
            }.bind(this));
    }

    componentDidMount() {
        const filmId = this.props.location.pathname.split('/')[2];
        this.getFilmDetails(filmId);
    }

    render () {
        if(!this.state.film.title)
            return (
                <div className="loading-message">Loading...</div>
            );
        else
            return (
                <div className="film-details-view">
                    <Link className="arrow-back" to={'/'} alt="df">&#8630;</Link>
                    <div className="title">
                        <div className="english-title">{this.state.film.title}</div>
                        <div className="original-title">{this.state.film.original_title}</div>
                    </div>
                    <div className="details-row">
                        <img src={'http://image.tmdb.org/t/p/w185/' + this.state.film.poster_path}/>
                        <div className="details">
                            <div className="items">
                                <div className="item"><span className="label">Duration:&nbsp;</span>{Math.floor(this.state.film.runtime/60)}h {this.state.film.runtime - 60*Math.floor(this.state.film.runtime/60)}min</div>
                                {this.state.film.genres &&
                                <div className="item"><span className="label">Genres:&nbsp;</span>{this.state.film.genres.map(genre => {
                                    return (
                                        <span key={genre.id}>{genre.name + (genre !== this.state.film.genres[this.state.film.genres.length-1] ? ',\u00A0': '')}</span>
                                    )})}
                                </div>
                                }
                                <div className="item"><span className="label">Release date:&nbsp;</span>{this.state.film.release_date}</div>
                                <div className="item"><span className="label">Language:&nbsp;</span>{this.state.film.original_language}</div>
                                {this.state.film.production_countries &&
                                <div className="item"><span className="label">Country:&nbsp;</span>{this.state.film.production_countries.map(country => {
                                    return (
                                        <span key={country.name}>{country.name + (country !== this.state.film.production_countries[this.state.film.production_countries.length-1] ? ',\u00A0': '')}</span>
                                    )})}
                                </div>
                                }
                                <div className="item"><span className="label">Budget/Revenue:&nbsp;</span>
                                    {this.state.film.budget && this.state.film.budget !== 0 ? ('$ ' + this.state.film.budget.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')) : ' ?'} /
                                    {this.state.film.revenue && this.state.film.revenue !== 0 ? (' $ ' + this.state.film.revenue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')) : ' ?'}</div>
                            </div>

                            <div className="rating">
                                <div className="stars" style={{background: '-webkit-linear-gradient(left, #f0736d ' + this.state.film.vote_average*10 + '%, #dadada ' + this.state.film.vote_average*10 + '%)'}}>
                                    <span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span>
                                </div>
                                <div className="number">{this.state.film.vote_average} ({this.state.film.vote_count})</div>
                            </div>
                        </div>
                    </div>
                    <div className="overview">{this.state.film.overview}</div>
                </div>
            )
    }
}

module.exports = FilmDetails;