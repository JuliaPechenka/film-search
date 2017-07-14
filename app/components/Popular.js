import React from 'react';
import api from '../utils/api';

const Types = props => {
    var types = ['Top Rated', 'Popular', 'Latest', 'Upcoming'];
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
            <div className={"animated-border " + (props.selectedType === 'Top Rated' ? 'trans-1' : (props.selectedType === 'Popular' ? 'trans-2' : (props.selectedType === 'Latest' ? 'trans-3' : 'trans-4')))}></div>
        </div>
    )
};

const styles = {
    rating: {
        backgroundImage: "linear-gradient(left, #eee, #eee 80%, #333 80%)"
    }
}
const Films = props => {
    return (
        <div className="films">
            {props.films.map(film => {
                return (
                    <div className="film" key={film.id}>
                        <img src={'http://image.tmdb.org/t/p/w185/' + film.poster_path}/>
                        <div className="description">
                            <div className="title">{film.title}</div>
                            <div className="overview">{film.overview.substring(0, 100) + '...'}</div>
                            <div className="rating"><span className="star">&#9733;&nbsp;</span>{film.vote_average}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
};

class Popular extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedType: 'Top Rated',
            films: null
        };

        this.getFilms = this.getFilms.bind(this);
    }

    getFilms(type) {
        this.setState({
            selectedType: type,
            films: null
        });

        if (type === 'Top Rated') {
            api.getTopRatedFilms()
                .then(function(films){
                    this.setState({
                        films: films
                    })
                }.bind(this));
        } else if (type === 'Popular') {
            api.getPopularFilms()
                .then(function(films){
                    this.setState({
                        films: films
                    })
                }.bind(this));
        } else if (type === 'Latest') {
            api.getLatestFilms()
                .then(function(films){
                    this.setState({
                        films: films
                    })
                }.bind(this));
        } else if (type === 'Upcoming') {
            api.getUpcomingFilms()
                .then(function(films){
                    this.setState({
                        films: films
                    })
                }.bind(this));
        }
    }

    componentDidMount() {
        this.getFilms(this.state.selectedType);
    }

    render () {
        return (
            <div>
                <Types selectedType={this.state.selectedType} onSelect={this.getFilms}/>
                {!this.state.films
                    ? <div>While loading films was a problem on a server side</div>
                    : <Films films={this.state.films}/>}
            </div>
        )
    }
}

module.exports = Popular;