const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
require('./seeds');

const app = express();
const PORT = 3005;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/cinema', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(() => console.log('MongoDB has started ...'))
  .catch(e => console.log(e));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});
