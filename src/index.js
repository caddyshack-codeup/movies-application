/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */



const {getMovies} = require('./api.js');

const constructHtml = () => {
  let htmlString = '';
  getMovies().then((movies) => {
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
      // console.log(`${title}, ${rating}, id: ${id}`);
      htmlString += `<div class="movie-id-${id}"><h1>${title}</h1><p>${rating}</p></h1>
                    <button id='${id}' class='delete-button btn btn-row btn-sm border-left border-right border-dark'>Remove</button></div>
                    <button class="${id} edit-button btn btn-row btn-sm border-left border-right border-dark">Edit</button>`;
    });
    $('.right-container').html(htmlString);

  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });
  htmlString = '';
};

constructHtml();


//EVENT LISTENER for top search bar (search button or hitting enter)

$('.add-movie-button').click(function(e){
  e.preventDefault();

  let movieSearch = ($('.search-bar').val());
  console.log(movieSearch);

  searchMovies(movieSearch);

});


//search function for posters to populate

function searchMovies(movieSearch) {
  let posterString = '';
  fetch('https://api.themoviedb.org/3/search/movie?api_key=' + '9e3a901be1e7a11297a35248aeac1012' + '&query=' + movieSearch)
      .then(function(response) {
        response.json().then(function (object) {
          object.results.forEach(function({id, title, poster_path, release_date, overview}){
            // console.log(title, vote_average, backdrop_path, poster_path, release_date, overview);


            posterString += `<div id='${title}' class='each-movie'>
                                     <img id='${id}' src='https://image.tmdb.org/t/p/w200/${poster_path}'><br>
                                     <h3>${title}</h3>
                               </div>`;
            $('.movie-container').html(posterString);
          });


//POST METHOD for adding movie title, rating, and id to api


          const addMovie = (movieTitle, movieRating, movieId) => {
            const movieAdded = {title: movieTitle, rating: movieRating, id: movieId};
            const url = '/api/movies';
            const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(movieAdded),
            };
            fetch(url, options)
                .then(constructHtml);

          };

//THIS is the pop-up window that allows user to rate selected title


          $('.each-movie').off().click(function(e){
            e.preventDefault();
            let userSearch = (this.id);


            $('.rating-popup-window').show();
            $('#rating-submit-button').off().click(function(e) {
              e.preventDefault();
              $('.rating-popup-window').hide();
              let movieRating = $('#movie-rating').val();
              console.log(userSearch);
              console.log(movieRating);
              return addMovie(userSearch, movieRating);
            });
          });
        })
      })
}

// PATCH method for editing movie rating


const editMovie = (title, newMovieRating, id) => {
  console.log(title, newMovieRating, id);
  const movieEdited = {title: title, rating: newMovieRating, id: id};
  console.log(movieEdited);
  const url = `/api/movies/${id}`;
  const options = {
    method: 'PATCH',
    headers : {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieEdited)
  };
  fetch(url, options)
      .then(constructHtml);
};



//EDIT BUTTON, determines which edit button is being clicked

$(document).on('click', '.edit-button', function (e) {
  e.preventDefault();
  console.log(e.target);
  getMovies().then((movies) => {
    movies.forEach(({title, rating, id}) => {
      let movieId = id.toString();
      if (($(this).attr('class')).includes(movieId)) {
        // console.log(title, rating, movieId);
        $('.edit-popup-window').show();
        $('#edit-submit-button').click(function(e) {
          $('.edit-popup-window').hide();
          e.preventDefault();
          let newMovieRating = $('#edit-rating').val();
          // console.log(title, newMovieRating, movieId);
          editMovie(title, newMovieRating, id);
        })
      }
    });

  })
});



//DELETE METHOD for REMOVING movie title, rating, and id

const deleteMovie = (deleteMovieId) => {
  let url = `/api/movies/${deleteMovieId}`;
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  fetch(url, options)
      .then(constructHtml)
};

//DELETE BUTTON event listener

$(document).on("click", ".delete-button", function (e) {
  e.preventDefault();
  console.log(e.target);
  getMovies().then((movies) => {
    movies.forEach(({id}) => {
      let deleteMovieId = id;
      if ($(this).attr('id') === id.toString()) {
        deleteMovie(deleteMovieId);
      }
    })
  })
});













