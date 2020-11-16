import { gql } from '@apollo/client'

export const ADD_BOOK = gql`
    mutation ($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(
            title: $title,
            published: $published,
            author: $author,
            genres: $genres
        ) {
            title
            published
            author
            genres
        }
    }
`

export const SET_BIRTH_DATA = gql`
    mutation ($name: String!, $setBornTo: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $setBornTo
        ) {
            name
            born
        }
    }
`