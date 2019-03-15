
function discoverMovies() {
  fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + '9e3a901be1e7a11297a35248aeac1012')
    .then(function(result) {
    console.log(result.json());
    });
}

function searchMovies(movieSearch) {
  fetch('https://api.themoviedb.org/3/search/movie?api_key=' + '9e3a901be1e7a11297a35248aeac1012' + '&query=' + movieSearch )
    .then(function(result) {
    console.log(result.json());
    });
}


discoverMovies();
searchMovies('jaws');


  // fetch('')
  //     .then(response => {
  //       console.log(response.json());
  // })

