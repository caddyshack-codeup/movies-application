

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

function searchMovies(movieSearch) {
  htmlString = '';
  fetch('https://api.themoviedb.org/3/search/movie?api_key=' + '9e3a901be1e7a11297a35248aeac1012' + '&query=' + movieSearch )
      .then(function(response) {
        response.json().then(function (object) {
          object.results.forEach(function({title, vote_average, backdrop_path, poster_path, release_date, overview}){
            // console.log(title, vote_average, backdrop_path, poster_path, release_date, overview);


            if (poster_path !== 'null') {

              htmlString += `<div class='each-movie'><h1>${title}</h1><img src='https://image.tmdb.org/t/p/w200/${poster_path}'></div>`;
              $('.movie-container').html(htmlString);

              console.log(htmlString)

            }


            $('.each-movie').click(function(){

              console.log(this);
              getInfo(poster_path, title)
            });

            function getInfo(poster_path, title) {
              console.log(`Title: ${title}, poster: ${poster_path}`)

            }


          });



        })
      })
}

$('.btn').click(function(e){
  e.preventDefault();

  let movieSearch = ($('.search-bar').val());
  console.log(movieSearch);

  searchMovies(movieSearch);



});















// discoverMovies();





  // fetch('')
  //     .then(response => {
  //       console.log(response.json());
  // })

