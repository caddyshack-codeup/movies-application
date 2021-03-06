/**
 * es6 modules and imports
 */

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


            // posterString += `<div id='${title}' class='each-movie'>
            //                          <img id='${id}' src='https://image.tmdb.org/t/p/w200/${poster_path}'><br>
            //                          <h4>${title}</h4>
            //                    </div>`;
            // $('.movie-container').html(posterString);

            if (poster_path !== null) {
              posterString += `<div id='${title}' class='each-movie'>
                                     <img id='${id}' src='https://image.tmdb.org/t/p/w200/${poster_path}'><br>
                                     <h3>${title}</h3>
                               </div>`;
              $('.movie-container').html(posterString);

            }
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
              let movieRating = $('#movie-rating2').val();
              console.log(userSearch);
              console.log(movieRating);
              return addMovie(userSearch, movieRating);
            });
          });
        })
      })
}

// PATCH method for editing movie rating


const editMovie2 = (title, newMovieRating, id) => {
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
          editMovie2(title, newMovieRating, id);
        })
      }
    });

  })
});



//DELETE METHOD for REMOVING movie title, rating, and id

const deleteMovie2 = (deleteMovieId) => {
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
        deleteMovie2(deleteMovieId);
      }
    })
  })
});

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  let html = "";
  movies.forEach(({title, rating, id}) => {
    html += constructHtml(title, rating, id);
    console.log(`id#${id} - ${title} - rating: ${rating}`);
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


const addMovie = ({title, rating}) => {
  let newMovie = { title, rating };
  fetch('./api/movies', {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"},
    body: JSON.stringify(newMovie)}).then(constructHtml);
  // .then(response => JSON.stringify(response));
};


// ////////////////////////////////////////
// //////// EDIT MOVIE BUTTON /////////////
// ////////////////////////////////////////

  const editMovie = (id, editedMovie) => {
    fetch(`./api/movies/${id}`, {
      "method": "PUT",
      "headers": {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedMovie)
    }).then(constructHtml);
    // .then(response => JSON.stringify(response));
  };


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
    // makeHTML(editMovie());


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
          if (movie.id === id) {
            let returnNewObj = {
              "title": movie.title,
              "rating": movie.rating
            };

            for (let movie of movies) {
              // console.log(movie.id);
              if (movie.id === id) {
                let returnNewObj = {
                  "title": movie.title,
                  "rating": movie.rating
                };


                $('#edit-title').val(returnNewObj.title);
                $('#edit-rating').val(returnNewObj.rating);


              }

            }
          }

        }});


// console.log(pullMovieData($('#edit-title').val()));



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
              "Content-Type": "application/json"
            }
          })
              .then(response => JSON.stringify(response)).then(constructHtml);
        };

}});

//Load page concat and load function

// const randomQuoteGenerator = function() {
//
//   const randomQuotes = [
//     `"Frankly, my dear, I don't give a damn." - Gone With the Wind, 1939`,
//     `“I'm going to make him an offer he can't refuse.” - The Godfather, 1972`,
//     `“You don't understand! I coulda had class. I coulda been a contender. I could've been somebody, instead of a bum, which is what I am.” - On the Waterfront, 1954`,
//     `“Toto, I've got a feeling we're not in Kansas anymore.” - The Wizard of Oz, 1939
//   Fun fact: As one of the most famous movie quotes in film history, this line has been parodied by many different movies and television shows.`,
//     `“Here's looking at you, kid.” - Casablanca, 1942`
//   ];
//
//   console.log(randomQuotes);
//
//   let loadScreenHtml = '';
//   let randNum = (Math.floor(Math.random() * (randomQuotes.length)));
//   for(let i = 0; i < randomQuotes.length; i++) {
//     console.log(randNum);
//     loadScreenHtml = randomQuotes[randNum];
//     console.log(loadScreenHtml);
//     $('.load-screen').html(`<h1>${loadScreenHtml}</h1>`)
//   }
// };
//
// randomQuoteGenerator();









