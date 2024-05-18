const { GraphQLError } = require('graphql')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const jwt = require('jsonwebtoken')

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
      allAuthors: async () => {
        return await Author.find({}).populate('books')
      },
      me: (root, args, context) => {
        return context.currentUser
      },
      booksByGenre: async (root, args) => {
        if (!args.genre) {
          return await Book.find({}).populate('author')
        }
        return await Book.find({ genres: args.genre }).populate('author')
      }
    }, 
    Author: {
      bookCount: async (root, args, context) => {
        const author = await Author.findOne({ name: root.name })
        return author.books.length
      } 
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
      
        const existentAuthor = await Author.findOne({ name: args.author }) 
        if (!existentAuthor) {
          try {
            const newAuthor = new Author({ name: args.author })
      
            const newBook = new Book({ ...args, author: newAuthor })
            const book = await newBook.save()
            newAuthor.books.push(book)
            await newAuthor.save()
      
            pubsub.publish('BOOK_ADDED', { bookAdded: book })
            return book
          } catch (error) {
            console.log(error)
            throw new GraphQLError('Saving person failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          }
        } else {
          try {
            const newBook = new Book({ ...args, author: existentAuthor })
            const book = await newBook.save()
            existentAuthor.books.push(book)
            await existentAuthor.save()
      
            pubsub.publish('BOOK_ADDED', { bookAdded: book })
            return book
          } catch (error) {
            console.log(error)
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
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
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
    }, 
    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
    }, 
}

module.exports = resolvers