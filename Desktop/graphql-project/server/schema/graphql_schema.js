const graphql = require('graphql');
const _ = require('lodash');

const Book  = require('../db_model/books');
const Author = require('../db_model/author');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

// dummy data without db 
/*
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
*/

// for author
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: ()=>({
    // GraphQLID converts integer into string
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    author_no: {type: GraphQLString},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        // use when working with dummy data without db
        // return _.filter(books, {authorid: parent.id})
      }
    }
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

      // use when working with dummy data without db
      // resolve(parent, args){
       // return _.find(authors, {id: parent.authorid})
      //}
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type:GraphQLID}},

      // use when working with dummy data without db
      //resolve(parent, args){
        // code to get data from db
         // return _.find(books, {id:args.id});
      //}
    },
    authors: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},

      // use when working with dummy data without db
      //resolve(parent, args){
        // code to get data from db
         //return _.find(authors, {id:args.id} )
      //}
    }
  }
});

const Mutation  = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
      },
      resolve(parent, args){
        let author = new Author({
          name: args.name,
          age: args.age
        });
        // save to db and return the parameters
        return author.save();
      }
    },
    addBooks: {
      type: BookType,
      args: {
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        price: {type: GraphQLString},
        author_no :{type: GraphQLString}
      },
      resolve(parent, args){
        let book  = new Book({
          name: args.name,
          genre: args.genre,
          price: args.price,
          author_no: args.author_no
        });
        // save to db and return the parameters
        return book.save();
      }
    }
    
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});