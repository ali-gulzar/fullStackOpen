import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_FAVORITE_GENRE, GET_ALL_BOOKS } from '../graphql/queries'

const Recommended = ({show}) => {

    const getFavGenre = useQuery(GET_FAVORITE_GENRE)
    const getBooks = useQuery(GET_ALL_BOOKS)

    if (!show || getFavGenre.loading || getBooks.loading) return null

    const favGenre = getFavGenre.data.me.favoriteGenre
    const books = getBooks.data.allBooks.filter(book => book.genres.includes(favGenre))

    return(
        <div>
            <h1>recommendations</h1>
            <p>books in your favorite genre {favGenre}</p>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>
                    author
                    </th>
                    <th>
                    published
                    </th>
                </tr>
                {books.map(a =>
                    <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommended