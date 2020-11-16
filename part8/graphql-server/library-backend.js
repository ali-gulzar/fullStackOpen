const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/books')
const Author = require('./models/authors')

const MONGODB_URI = 'mongodb+srv://fullstack:fullstackopen@palindrome.ogcpn.mongodb.net/book-application?retryWrites=true&w=majority' 
console.log("connecting to", MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(() => console.log("Connected to MONGODB!"))
.catch(() => console.log("Connected failed to MONGODB!"))

const typeDefs = gql`
    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }
    type Token {
      value: String!
    }
    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]
        allAuthors: [Author!]
        resetBooks: String
        resetAuthors: String
        me: User
    }
    type Mutation {
      addBook(
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
      ): Book
      addAuthor(
        name: String!
        born: Int
      ): Author
      editAuthor(name: String!, setBornTo: Int!): Author
    }
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
          let books = await Book.find({}).populate('author')
          if (!args.author && !args.genre) return books
          if (args.author) {
            books = books.filter(book => book.author.name === args.author)
          }
          if (args.genre) {
            books = books.filter(book => book.genres.includes(args.genre))
          }
          return books
        },
        allAuthors: async () => {
            const authors = await Author.find({})
            return authors
        },
        resetBooks: async () => {
          await Book.deleteMany({})
          return "Book database reset done!"
        },
        resetAuthors: async () => {
          await Author.deleteMany({})
          return "Author database reset done!"
        }
    },
    Mutation: {
      addBook: async (root, args) => {
        const author = await Author.findOne({ name: args.author })
        if (!author) return null
        const book = new Book({...args, author})
        return book.save()
      },
      addAuthor: (root, args) => {
        const author = new Author({...args})
        return author.save()
      },
      editAuthor: async (root, args) => {
        const author = await Author.findOne({ name: args.name })
        if (author) {
          author.born = args.setBornTo
          return author.save()
        }
        return null
      }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})