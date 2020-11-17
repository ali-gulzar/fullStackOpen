import { gql } from '@apollo/client'

export const GET_ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const GET_ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author {
                name
            }
            published
            genres
        }
    }
`

export const GET_ALL_GENRE = gql`
    query {
        getAllGenre
    }
`

export const GET_FAVORITE_GENRE = gql`
    query {
        me {
            favoriteGenre
        }
    }
`