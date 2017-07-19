import React from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: this.props.location.search ?  this.props.location.search.split('=')[1].replace('%20', ' ') : '',
            searchFilms: null
        };

        this.searchFilms = this.searchFilms.bind(this);
    }

    searchFilms(event) {
        this.setState({
            searchQuery: event.target.value
        }, function() {
            if(this.state.searchQuery !== '') {
                this.props.history.push('/search?query=' + this.state.searchQuery);
            } else {
                this.props.history.push('');
            }
        })

    }

    componentWillReceiveProps(newProps) {
        this.setState({
            searchQuery: newProps.location.search === '' ? '' : newProps.location.search.split('=')[1],
            searchFilms: null
        });
    }

    render() {
        return (
            <div className="header">
                <div className="container">
                    <ul className='nav'>
                        <li>
                            <NavLink exact activeClassName='active' to='/'><span className="menu-icon">&#8962;</span>Main</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='active' to='/genres'><span className="menu-icon">&#9776;</span>Genres</NavLink>
                        </li>
                    </ul>

                    <div className="header-search">
                        <input className="search" value={this.state.searchQuery} onChange={this.searchFilms}/>
                        <span className="search-icon">&#9906;</span>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Nav;