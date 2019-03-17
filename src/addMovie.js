"use strict";


module.exports = {
    addMovie: ({title, rating}) => {
        let newMovie = { title, rating };
        fetch('./api/movies', {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"},
            body: JSON.stringify(newMovie)});
            // .then(response => JSON.stringify(response));
    }
    // addMovie(newMovie);
};