const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Book = require('./models/books')
const Author = require('./models/authors')
const User = require('./models/users')

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
        resetUsers: String
        getAllGenre: [String!]
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
      editAuthor(name: String!, born: Int!): Author
      createUser(username: String!, favoriteGenre: String!): User
      login(username: String!, password: String!): Token!
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
        },
        resetUsers: async () => {
          await User.deleteMany({})
          return "Users database reset done!"
        },
        getAllGenre: async() => {
          const books = await Book.find({})
          let genres = []
          Promise.all(books.map(book => {
            book.genres.map(genre => genres.push(genre))
          }))
          return [...new Set(genres)]
        },
        me: (root, args, context) => {
          return context.currentUser
        }
    },
    Mutation: {
      addBook: async (root, args, context) => {

        const currentUser = context.currentUser
        if (!currentUser) throw new AuthenticationError("Authentication errror.")

        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({name: args.author, bookCount: 1})
        } else {
          author.bookCount = author.bookCount + 1
        }

        const book = new Book({...args, author})
        try {
          await author.save()
          await book.save()
        } catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
        return book
      },
      addAuthor: async (root, args) => {
        const author = new Author({...args})
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
        return author
      },
      editAuthor: async (root, args, context) => {

        const currentUser = context.currentUser
        if (!currentUser) throw new AuthenticationError("Authentication error.")

        const author = await Author.findOne({ name: args.name })
        if (author) {
          author['born'] = args.born
          return author.save()
        }
        return null
      },
      createUser: async (root, args) => {
        const user = new User({...args})
        try {
          await user.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
        return user
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })

        if (!user || args.password !== "secret") {
          throw new UserInputError("wrong credentials")
        }

        const userForToken = {
          username: args.username,
          id: user._id
        }

        return { value: jwt.sign(userForToken, "SECRET_STRING") }

      }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), "SECRET_STRING"
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})