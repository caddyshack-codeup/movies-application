/**
 * es6 modules and imports
 */


/**
 * require style imports
 */



const {getMovies} = require('./api.js');
const {addMovie} = require('./addMovie.js');


const makeHTML = (title, rating, id) => {
  let html = `<div class="col">`;
  html += `<h1>${title}</h1>`;
  html += `<h2>${rating}</h2>`;
  html += `<button class="editMovie" id="${id}">Edit</button>`;
  html += `<button class="deleteMovie" id="${id}">Delete</button>`;
  html += `</div>`;
  return html;
}



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

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  let html = "";
  movies.forEach(({title, rating, id}) => {
    html += makeHTML(title, rating, id);
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });

  $("#movies").html(html);
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  // console.log(error);
});



////////////////////////////////////////
//////// ADD MOVIE BUTTON //////////////
////////////////////////////////////////
$('#submitMovie').on('click', (e) => {
  e.preventDefault();

  // console.log(getRating($('#movie-rating').val()));
  // let movieRating = getRating($('#movie-rating').val());
  const newMovie = {
    "title": $('#movie-title').val(),
    "rating": $('#movie-rating').val()
  };
  console.log(newMovie);
  console.log(JSON.stringify(newMovie));
  addMovie(newMovie);
  // showMovies();

});



// ////////////////////////////////////////
// //////// EDIT MOVIE BUTTON /////////////
// ////////////////////////////////////////

$(document).on('click', 'button.editMovie', (e) => {
  e.preventDefault();
  $('.edit').toggleClass('hiding');
  let id = $(e.target).attr('id');
  id = parseInt(id);
  pullMovieData(id);
  $('#editMovie').on('click', (e) => {
    e.preventDefault();
    let editedTitle = $('#edit-title').val();
    let editedRating = $('#edit-rating').val();
    let editedMovie = {
      "title": editedTitle,
      "rating": editedRating
    };
    editMovie(id, editedMovie);

  })



});


const pullMovieData = (id) => {
  fetch(`./api/movies`, {
    "method": "GET",
    "headers": {
      "Content-Type": "application/json"}
  })
      .then(response => response.json())
      .then(movies => {
          for (let movie of movies) {
              // console.log(movie.id);
              if(movie.id === id) {
                let returnNewObj = {
                  "title": movie.title,
                  "rating": movie.rating
                };

const getRating = (stars) => {
    switch (stars) {
      case "5 Stars":
        console.log('5');
        return 5;
      case "4 Stars":
        console.log('4');
        return 4;
      case "3 Stars":
        console.log('3');
        return 3;
      case "2 Stars":
        console.log('2');
        return 2;
      case "1 Star":
        console.log('1');
        return 1;
      default:
        return "undefined"
    }
  };


                $('#edit-title').val(returnNewObj.title);
                $('#edit-rating').val(returnNewObj.rating);


              }

          }
  });
};

// console.log(pullMovieData($('#edit-title').val()));

const editMovie = (id, editedMovie) => {
  fetch(`./api/movies/${id}`, {
    "method": "PUT",
    "headers": {
      "Content-Type": "application/json"},
    body: JSON.stringify(editedMovie)})
      .then(response => JSON.stringify(response));
};



////////////////////////////////////////
//////// DELETE MOVIE BUTTON ///////////
////////////////////////////////////////
$(document).on('click', 'button.deleteMovie', (e) => {
  e.preventDefault();
  let id = $(e.target).attr('id');
  id = parseInt(id);
  deleteMovie(id);

  });

const deleteMovie = (id) => {
  fetch(`./api/movies/${id}`, {
    "method": "DELETE",
    "headers": {
      "Content-Type": "application/json"}
  })
      .then(response => JSON.stringify(response));
};



////////////////////////////////////////////////////////
/////////// RANDOM NOTES TO MYSELF /////////////////////
////////////////////////////////////////////////////////
//////// type npm run dev in terminal, then refresh window

//////// npm run dev in terminal, then refresh window

//Loading text while our AJAX request processes
// $(document).ready(function () {
//   $(document).ajaxStart(function () {
//     $("#loading").show();
//   }).ajaxStop(function () {
//     $("#loading").hide();
//   });
// });








