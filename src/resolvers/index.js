import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub()

// Subscription test. Should trigger the 'helloWorld' subscription every 5 seconds.
setInterval(() => pubsub.publish('HELLO_WORLD', { helloWorld: 'Hello world!' }), 5000)

export default {
  Query: {
    books: (_parent, _args, { prisma }) => {
      return prisma.book.findMany({ include: { author: true } })
    },
    authors: (_parent, _args, { prisma }) => prisma.author.findMany({ include: { books: true } })
  },
  Mutation: {
    createBook: async (
      _parent,
      { authorId, data },
      { prisma }
    ) => {
      const createdBook = await prisma.book.create({
        data: {
          title: data.title,
          author: {
            connect: {
              id: authorId
            }
          }
        },
      })
      pubsub.publish('BOOK_CREATED', { bookCreated: createdBook })

      return {
        result: createdBook
      }
    },
    updateBook: async (
      _parent,
      { data },
      { prisma }
    ) => {
      const updatedBook = await prisma.book.update({
        where: {
          id: data.id
        },
        data: {
          title: data.title
        }
      })

      pubsub.publish('BOOK_UPDATED', { bookUpdated: updatedBook })

      return {
        result: updatedBook
      }
    },
    deleteBook: async (
      _parent,
      { data },
      { prisma }
    ) => {
      const deletedBook = await prisma.book.delete({
        where: {
          id: data.id
        }
      })

      pubsub.publish('BOOK_DELETED', { bookDeleted: deletedBook })

      return {
        result: deletedBook
      }
    },
    createAuthor: async (
      _parent,
      { data },
      { prisma }
    ) => {
      const createdAuthor = prisma.author.create({
        data: {
          name: data.name,
        }
      })

      pubsub.publish('AUTHOR_CREATED', { authorCreated: createdAuthor })

      return {
        result: createdAuthor
      }
    },
    updateAuthor: async (
      _parent,
      { data },
      { prisma }
    ) => {
      const updatedAuthor = await prisma.author.update({
        where: {
          id: data.id
        },
        data: {
          name: data.name
        }
      })

      pubsub.publish('AUTHOR_UPDATED', { authorUpdated: updatedAuthor })

      return {
        result: updatedAuthor
      }
    },
    deleteAuthor: async (
      _parent,
      { data },
      { prisma }
    ) => {
      const deletedAuthor = await prisma.author.delete({
        where: {
          id: data.id
        }
      })

      pubsub.publish('AUTHOR_DELETED', { authorDeleted: deletedAuthor })

      return {
        result: deletedAuthor
      }
    }
  },
  Subscription: {
    helloWorld: {
      subscribe: () => pubsub.asyncIterableIterator(['HELLO_WORLD'])
    },
    bookCreated: {
      subscribe: () => pubsub.asyncIterableIterator(['BOOK_CREATED']),
    },
    bookUpdated: {
      subscribe: () => pubsub.asyncIterableIterator(['BOOK_UPDATED']),
    },
    bookDeleted: {
      subscribe: () => pubsub.asyncIterableIterator(['BOOK_DELETED']),
    },
    authorCreated: {
      subscribe: () => pubsub.asyncIterableIterator(['AUTHOR_CREATED']),
    },
    authorUpdated: {
      subscribe: () => pubsub.asyncIterableIterator(['AUTHOR_UPDATED']),
    },
    authorDeleted: {
      subscribe: () => pubsub.asyncIterableIterator(['AUTHOR_DELETED']),
    },
  }
}
