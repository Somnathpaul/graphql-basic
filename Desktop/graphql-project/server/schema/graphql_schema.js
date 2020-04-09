const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString, GraphQLInt} = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: ()=>({
    id: {type: GraphQLInt},
    name: {type: GraphQLString},
    genre: {type: GraphQLString}
  })
});