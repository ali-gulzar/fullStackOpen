import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_ALL_AUTHORS } from '../graphql/queries'
import { SET_BIRTH_DATA } from '../graphql/mutations'

const Authors = (props) => {

  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const results = useQuery(GET_ALL_AUTHORS)
  const [update, result] = useMutation(SET_BIRTH_DATA, {
    refetchQueries: [ {query: GET_ALL_AUTHORS }]
  })

  const updateAuthor = (event) => {
    event.preventDefault()

    const numberYear = Number(year)
    update({ variables: { name, setBornTo: numberYear } })

    if (result.data && result.data.editAuthor === null) {
      console.log("Person not found")
    }
    setName('')
    setYear('')

  }

  if (!props.show || results.loading) {
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
          {results.data.allAuthors.map(a =>
            <option value={a.name}>{a.name}</option>
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
