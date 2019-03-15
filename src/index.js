

let htmlString='';

function discoverMovies() {
  fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + '9e3a901be1e7a11297a35248aeac1012')
    .then(function(response) {
      response.json().then(function (object) {
        object.results.forEach(function({title, vote_average, backdrop_path, poster_path, release_date, overview}){
          // console.log(title, vote_average, backdrop_path, poster_path, release_date, overview);

          posterHtmlString += `<img src="https://image.tmdb.org/t/p/w200/${poster_path}"`;
          $('.movie-container').html(htmlString);
        });

        htmlString = `<div class='each-movie'>${posterHtmlString}</div>`;
        console.log(htmlString);

      })
    })
}

// https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg

function searchMovies(movieSearch) {
  htmlString = '';
  fetch('https://api.themoviedb.org/3/search/movie?api_key=' + '9e3a901be1e7a11297a35248aeac1012' + '&query=' + movieSearch )
      .then(function(response) {
        response.json().then(function (object) {
          object.results.forEach(function({title, vote_average, backdrop_path, poster_path, release_date, overview}){
            // console.log(title, vote_average, backdrop_path, poster_path, release_date, overview);

            htmlString += `<div class='each-movie'><img src='https://image.tmdb.org/t/p/w200/${poster_path}'></div>`;
            $('.movie-container').html(htmlString);



          });

          $('img').click(function(){

            console.log('yes');
          })

        })
      })
}

$('#search-button').click(function(e){
  e.preventDefault();

  let movieSearch = ($('#search').val());
  console.log(movieSearch);

  searchMovies(movieSearch);



});















// discoverMovies();





  // fetch('')
  //     .then(response => {
  //       console.log(response.json());
  // })

