module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  }
};

// module.exports = {
//   getMovies: () => {
//     return fetch('/api/movies')
//         .then(response => response.json()).then(response)
//   }
// };
