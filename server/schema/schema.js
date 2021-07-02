const graphql = require('graphql')
const _ = require('lodash')

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql

const books = [
    {name: 'Name', genre: 'Fantasy', id: "1", authorId: '1'},
    {name: 'Name', genre: 'No Worries', id: "2", authorId: '2'},
    {name: 'Name', genre: 'Cool', id: "3", authorId: '3'},
    {name: 'Hi', genre: 'Fantasy', id: "4", authorId: '1'},
    {name: 'Super', genre: 'No Worries', id: "5", authorId: '2'},
    {name: 'Charge', genre: 'Cool', id: "6", authorId: '2'},
    {name: 'Charles', genre: 'Coodsd', id: "7", authorId: '2'},
]

const authors = [
    {name: 'Janis', age: 44, id: "1"},
    {name: 'Joe', age: 34, id: "2"},
    {name: 'Doe', age: 74, id: "3"},
]


const BookType = new GraphQLObjectType({
    name: "Book",
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, {id:parent.authorId})
            }
        }
    })
})



const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=>({
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        id: {type: GraphQLID},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {id: {type:GraphQLID}},
            resolve(parent, args){

                return _.find(books, {id:args.id})
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id:args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})