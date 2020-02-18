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

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB'));

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});
