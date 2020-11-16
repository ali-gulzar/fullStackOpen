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
            author {
                name
            }
            genres
        }
    }
`

export const SET_BIRTH_DATA = gql`
    mutation ($name: String!, $born: Int!) {
        editAuthor(
            name: $name,
            born: $born
        ) {
            name
            born
        }
    }
`

export const LOGIN = gql`
    mutation ($username: String!, $password: String!) {
        login(
            username: $username
            password: $password
        ) {
            value
        }
    }
`