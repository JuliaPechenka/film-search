import axios from 'axios';

function getFilmDetails(id) {
    return axios.get('https://api.themoviedb.org/3/movie/' + id +'?api_key=36262ea7bb5555e17859faf1c5c99899');
}

function getFilmReviews(id) {
    return axios.get('https://api.themoviedb.org/3/movie/' + id +'/reviews?api_key=36262ea7bb5555e17859faf1c5c99899');
}

function getSimilarFilms(id) {
    return axios.get('https://api.themoviedb.org/3/movie/' + id +'/similar?api_key=36262ea7bb5555e17859faf1c5c99899');
}

module.exports = {
    getFilms: function(type) {
        var type = type.replace(/\s+/g, '_');
        var encodedURI = window.encodeURI('https://api.themoviedb.org/3/movie/' + type + '?api_key=36262ea7bb5555e17859faf1c5c99899');

        return axios.get(encodedURI)
            .then(function(response){
                return response.data.results;
            })
    },

    getFilmData: function (id) {
        return axios.all([
            getFilmDetails(id),
            getFilmReviews(id),
            getSimilarFilms(id)
        ]).then(function(data){
            var filmDetails = data[0];
            var reviews = data[1];
            var similarFilms = data[2];

            return {
                film: filmDetails.data,
                filmReviews: reviews.data.results,
                similarFilms: similarFilms.data.results
            }
        })
    },

    getGenres: function() {
        var encodedURI = window.encodeURI('https://api.themoviedb.org/3/genre/movie/list?api_key=36262ea7bb5555e17859faf1c5c99899');

        return axios.get(encodedURI)
            .then(function(response){
                return response.data.genres;
            })
    },

    getFilmsByGenre: function(genreId) {
        var encodedURI = window.encodeURI('https://api.themoviedb.org/3/genre/'+ genreId + '/movies?api_key=36262ea7bb5555e17859faf1c5c99899');

        return axios.get(encodedURI)
            .then(function(response){
                return response.data.results;
            })
    },

    searchFilm: function(query) {
        var encodedURI = window.encodeURI('https://api.themoviedb.org/3/search/movie?api_key=36262ea7bb5555e17859faf1c5c99899&query=' + query);

        return axios.get(encodedURI)
            .then(function(response){
                return response.data.results;
            })
    },
};