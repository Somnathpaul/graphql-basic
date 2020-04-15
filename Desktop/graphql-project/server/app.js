const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema  =  require('./schema/graphql_schema');
const connectDB = require('../config/db');

const app =  express();

// connect to mongodb
connectDB();

app.use('/graphql', graphqlHTTP({
  schema,
  // to add the gui testing 
  graphiql: true
}));

app.listen(4000, ()=>{console.log('listening on port 40000');
})