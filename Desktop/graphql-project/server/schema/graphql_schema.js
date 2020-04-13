const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt} = graphql;

// dummy data 
var books = [
  {name: 'Name of Wind', genre: 'Fantasy',id: '1' , price:'129', authorid: '1'},
  {name: 'The Final Empire', genre: 'Fantasy',id: '2', price:'129', authorid: '2'},
  {name: 'The long Earth', genre: 'Sci-Fi',id: '3', price:'129', authorid:'3' },
  {name: 'Hero of Ages', genre: 'Sci-Fi',id: '4', price:'129', authorid:'2' },
  {name: 'Colour of Magic', genre: 'Fantasy',id: '5', price:'129', authorid:'1' },
  {name: 'Light fantastic', genre: 'Fantasy',id: '6', price:'129', authorid:'3' }
];

var authors =[
  {name: 'Patrick Rothfuss', age: 44, id: '1'},
  {name: 'Brandon Sanderson', age: 45, id: '2'},
  {name: 'Terry Pratchetts', age: 47, id: '3'}
];
// for author
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: ()=>({
    // GraphQLID converts integer into string
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt}
  })
});


// for book 
const BookType = new GraphQLObjectType({
  name: 'Books',
  fields: ()=>({
    // GraphQLID converts integer into string
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    price: {type: GraphQLString},
    author:{
      type: AuthorType,
      // resolve func used to get data 
      // parent stores previous object data
      // args store current object data
      resolve(parent, args){
        return _.find(authors, {id: parent.authorid})
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type:GraphQLID}},
      resolve(parent, args){
        // code to get data from db
         return _.find(books, {id:args.id});
      }
    },
    authors: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        // code to get data from db
        return _.find(authors, {id:args.id} )
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});