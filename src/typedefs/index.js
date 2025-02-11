export default `#graphql
  type Query {
    books: [Book]
    authors: [Author]
  }

  type Mutation {
    createBook(authorId: ID!, data: CreateBookInput!): CreateBookPayload
    updateBook(data: UpdateBookInput!): UpdateBookPayload
    deleteBook(data: DeleteBookInput!): DeleteBookPayload
    createAuthor(data: CreateAuthorInput!): CreateAuthorPayload
    updateAuthor(data: UpdateAuthorInput!): UpdateAuthorPayload
    deleteAuthor(data: DeleteAuthorInput!): DeleteAuthorPayload
  }

  type Subscription {
    bookCreated: Book
    bookUpdated: Book
    bookDeleted: Book
    authorCreated: Author
    authorUpdated: Author
    authorDeleted: Author
    helloWorld: String
  }

  # ----------------------------------------

  type Book {
    id: ID!
    title: String
    author: Author
  }

  type Author {
    id: ID!
    name: String
    books: [Book]
  }

  type CreateBookPayload {
    result: Book
  }

  type UpdateBookPayload {
    result: Book
  }

  type DeleteBookPayload {
    result: Book
  }

  type CreateAuthorPayload {
    result: Author
  }

  type UpdateAuthorPayload {
    result: Author
  }

  type DeleteAuthorPayload {
    result: Author
  }

  input CreateBookInput {
    title: String!
  }

  input UpdateBookInput {
    id: ID!
    title: String!
  }

  input DeleteBookInput {
    id: ID!
  }

  input CreateAuthorInput {
    name: String!
  }

  input UpdateAuthorInput {
    id: ID!
    name: String!
  }

  input DeleteAuthorInput {
    id: ID!
  }
`
