/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

let htmlString = '';

  getMovies().then((movies) => {
    movies.forEach(({title, rating}) => {
      htmlString += (`<div class="each-movie"><h1>${title}</h1><p>${rating}</p></div>`)
    });



console.log(htmlString);


    for (var i = 0; i < htmlString.length; i++) {
      $('.movie-container').html(htmlString);

    };
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  });
