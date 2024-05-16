const { ApolloServer } = require('@apollo/server')
const { GraphQLError } = require('graphql')
const { startStandaloneServer } = require('@apollo/server/standalone')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

mongoose.set('strictQuery', false)
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Author {
      name: String!
      id: ID!
      born: Int
      phone: Int
      bookCount: Int!
  }  

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!],
    allAuthors: [Author!],
    me: User
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
        if (args.author) {
          const author = await Author.findOne({ name: args.author })
          return await Book.find({ author: author }).populate('author')
        } 
        if (args.genre) {
          return Book.find({ genres: args.genre }).populate('author')
        } else {
          return await Book.find({}).populate('author')
      }
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  }, 
  Author: {
    bookCount: async (root) => Book.find({ author: root.name }).count()
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const existentAuthor = await Author.find({ name: args.author })

      if (existentAuthor.length == 0) {
          const newAuthor = new Author({ name: args.author} )
          try {
            await newAuthor.save()
            const newBook = new Book({ ...args, author: newAuthor })  
            const book = await newBook.save()
            return book
          }
          catch (error) {
            throw new GraphQLError('Saving person failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          }
      } else {
        const author = existentAuthor[0]
        const newBook = new Book({ ...args, author: author }) 
        try {
          const book = await newBook.save()
          return book
        } 
        catch (error) {
          throw new GraphQLError('Saving person failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const exist = await Author.findOne({ name: args.name })

      if (!exist) return null
      exist.born = args.setBornTo
      try {
        return await exist.save()
      } catch (error) {
        throw new GraphQLError('Saving person failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })
      try {
        return await user.save()
      } catch (error) {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== "secret") {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'NOT_FOUND',
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  } 
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})