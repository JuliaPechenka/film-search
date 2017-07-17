import axios from 'axios';

module.exports = {
    getTopRatedFilms: function() {
        var encodedURI = window.encodeURI('https://api.themoviedb.org/3/movie/top_rated?api_key=36262ea7bb5555e17859faf1c5c99899');

        return axios.get(encodedURI)
            .then(function(response){
                return response.data.results;
            })
    },
    getPopularFilms: function() {
        var encodedURI = window.encodeURI('https://api.themoviedb.org/3/movie/popular?api_key=36262ea7bb5555e17859faf1c5c99899');

        return axios.get(encodedURI)
            .then(function(response){
                return response.data.results;
            })
    },
    getNowPlayingFilms: function() {
        var encodedURI = window.encodeURI('https://api.themoviedb.org/3/movie/now_playing?api_key=36262ea7bb5555e17859faf1c5c99899&language=en-US');

        return axios.get(encodedURI)
            .then(function(response){
                return response.data.results;
            })
    },
    getUpcomingFilms: function() {
        var encodedURI = window.encodeURI('https://api.themoviedb.org/3/movie/upcoming?api_key=36262ea7bb5555e17859faf1c5c99899');

        return axios.get(encodedURI)
            .then(function(response){
                return response.data.results;
            })
    },
    getFilmDetails: function(id) {
        var encodedURI = window.encodeURI('https://api.themoviedb.org/3/movie/' + id +'?api_key=36262ea7bb5555e17859faf1c5c99899');

        return axios.get(encodedURI)
            .then(function(response){
                return response.data;
            })
    },
};