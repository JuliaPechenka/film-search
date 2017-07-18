import React from 'react';
import { Link } from 'react-router-dom';
import { Films } from './Popular';

import api from '../utils/api';

class FilmDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            film: {},
            filmReviews: [],
            similarFilms: []
        };

        this.showComment = this.showComment.bind(this);
    }

    getFilmData(filmId) {
        window.scrollTo(0,0);

        api.getFilmData(filmId)
            .then(function(filmData){
                this.setState({
                    film: filmData.film,
                    filmReviews: filmData.filmReviews,
                    similarFilms: filmData.similarFilms
                })
            }.bind(this));
    }

    componentDidMount() {
        const filmId = this.props.location.pathname.split('/')[2];
        this.getFilmData(filmId);
    }

    componentWillReceiveProps(newProps) {
        const filmId = newProps.location.pathname.split('/')[2];
        this.getFilmData(filmId);
    }

    showComment(review) {
        review.expanded = !review.expanded;

        this.setState({
            review: review
        });
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
                    <div className="decorated-title">
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
                    <div className="section">
                        <div className="section-title">Reviews</div>
                        {this.state.filmReviews.map(review => {
                            return (
                                <div className="review" key={review.id}>
                                    <div className="author"><span className="pencil-icon">&#10000;</span>{review.author}</div>
                                    <div className="content">
                                        {!review.expanded && review.content.length > 300 ? review.content.substring(0, 300) + '... ' : review.content}
                                        {!review.expanded && review.content.length > 300 ? <span className="read-more-button" onClick={this.showComment.bind(null, review)}>Read more</span> : ''}
                                    </div>
                                </div>
                            )
                        })}
                        {this.state.filmReviews.length === 0 && <div>There are no reviews to this film.</div>}
                    </div>

                    <div className="section">
                        <div className="section-title" style={{width: 210}}>Similar films</div>
                        <div>If you like this movie do not miss also:</div>
                        <div className="similar-films">
                            {this.state.similarFilms.length !== 0 ? <Films films={this.state.similarFilms.splice(0,6)}/> : <div>There are no similar films.</div>}
                        </div>
                    </div>
                </div>
            )
    }
}

module.exports = FilmDetails;