import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_BOOKS, GET_ALL_GENRE } from '../graphql/queries'

const Books = (props) => {

  const [genre, setGenre] = useState('all')
  const results = useQuery(GET_ALL_BOOKS)
  const genres = useQuery(GET_ALL_GENRE)

  if (!props.show || results.loading || genres.loading) {
    return null
  }

  let books = results.data.allBooks
  if (genre !== 'all') {
    books = books.filter(book => book.genres.includes(genre))
  }

  return (
    <div>
      <h2>books</h2>

      <p>in genre <b>{genre}</b></p>

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

    {genres.data.getAllGenre.map(genre => (
      <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
    ))}
    <button onClick={() => setGenre('all')}>all genres</button>
    </div>
  )
}

export default Books