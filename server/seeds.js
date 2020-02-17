const Movie = require('./models/movie');
const Director = require('./models/director');

Director.find({}).then(directors => {
  if (!directors.length) {
    Director.insertMany([
      { name: 'Quentin Tarantino', age: 55 },
      { name: 'Michael Radford', age: 72 },
      { name: 'James McTeigue', age: 51 },
      { name: 'Guy Ritchie', age: 50 }
    ], () => {
      console.log('Directors are saved');

      Director.find({}, '_id').then(ids => {
        Movie.insertMany([
          { name: 'Pulp Fiction', genre: 'Crime', directorId: ids[0]._id },
          { name: '1984', genre: 'Sci-Fi', directorId: ids[1]._id },
          { name: 'V for vendetta', genre: 'Sci-Fi-Triller', directorId: ids[2]._id },
          { name: 'Snatch', genre: 'Crime-Comedy', directorId: ids[3]._id, },
          { name: 'Reservoir Dogs', genre: 'Crime', directorId: ids[0]._id },
          { name: 'The Hateful Eight', genre: 'Crime', directorId: ids[0]._id },
          { name: 'Inglourious Basterds', genre: 'Crime', directorId: ids[0]._id },
          { name: 'Lock, Stock and Two Smoking Barrels', genre: 'Crime-Comedy', directorId: ids[3]._id }
        ], () => {
          console.log('Movies are saved');

          Director.find({}).then(directors => {
            directors.forEach(async director => {
              const directorId = director._id;
              await Movie.find({directorId: directorId}, '_id').then(async ids => {
                const movieIds = director.movieIds;
                const newMovieIds = [...new Set(movieIds.concat(ids.map(obj => obj.id)))];
                await Director.findOneAndUpdate({_id: directorId}, {movieIds: newMovieIds}).then(() => {}).catch(error => console.log(error));
              });
            })
          });
        });
      });
    });
  }
});


// Population examples

// Movie.
//   findOne({ name: '1984' }).
//   populate('directorId').
//   exec((err, movie) => {
//     if (err) return console.error(err);
//     console.log('Director of the movie is %s', movie.directorId.name);
// });
//
// Director.
//   findOne({ name: 'Quentin Tarantino' }).
//   populate('movieIds').
//   exec((err, director) => {
//     if (err) return console.error(err);
//     console.log('The director has those movies: %s', director.movieIds.map(movie => movie.name).join(', '));
// });
