import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_ALL_AUTHORS } from '../graphql/queries'
import { SET_BIRTH_DATA } from '../graphql/mutations'

const Authors = (props) => {

  const [name, setName] = useState('select a name')
  const [year, setYear] = useState('')
  const results = useQuery(GET_ALL_AUTHORS)
  const [update, result] = useMutation(SET_BIRTH_DATA, {
    refetchQueries: [ {query: GET_ALL_AUTHORS }],
    onError: (error) => props.setMessage(error.graphQLErrors[0].message)
  })

  const updateAuthor = (event) => {
    event.preventDefault()

    update({ variables: { name, born: Number(year) } }).then(() => {
      if (result.data === undefined) {
        props.setMessage("peron not found")
      } else {
        props.setMessage("person updated.")
      }
    }).catch(error => console.log(error))
    setYear('')
  }

  if (!props.show || results.loading || results.data === undefined) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {results.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={updateAuthor}>
        <select value={name} onChange={(event) => setName(event.target.value)}>
          <option value="select a name">Select a name</option>
          {results.data.allAuthors.map(a =>
            <option key={a.name} value={a.name}>{a.name}</option>
          )}
        </select>
        <div>
          born <input type="number" value={year} onChange={(event) => setYear(event.target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>

    </div>
  )
}

export default Authors
