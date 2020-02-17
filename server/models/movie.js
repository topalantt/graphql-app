const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: String,
  genre: String,
  directorId: { type: Schema.Types.ObjectId, ref: 'Director' },
});

module.exports = mongoose.model('Movie', movieSchema);
