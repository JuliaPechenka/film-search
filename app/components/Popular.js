import React from 'react';
import api from '../utils/api';

const Types = props => {
    var types = ['Top Rated', 'Popular', 'Latest', 'Upcoming'];
    return (
        <ul className="types">
            {types.map(type => {
                return (
                    <li key={type}>{type}</li>
                )
            })}
        </ul>
    )
};

const Films = props => {
    return (
        <div className="films">
            {props.films.map(film => {
                return (
                    <div className="film" key={film.id}>
                        <img src={'http://image.tmdb.org/t/p/w185/' + film.poster_path}/>
                        <div className="description">
                            <div className="title">{film.title}</div>
                            <div className="rating"><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></div>
                            <div>{film.vote_average}({film.vote_count})</div>
                            <div className="overview">{film.overview}</div>
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
                    ? <div>Loading</div>
                    : <Films films={this.state.films}/>}
            </div>
        )
    }
}

module.exports = Popular;