import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState('')
  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('user-token'))
  },[])

  const displayNotification = (value) => {
    setMessage(value)
    setTimeout(() => {
        setMessage('')
    }, 2000);
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const successfullLogin =  (token) => {
    setToken(token)
    setPage('authors')
    setMessage('User logged in')
    setTimeout(() => {
        setMessage('')
    }, 2000);
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('add')}>add book</button>: ''}
        <button onClick={() => token ? logout() : setPage('login')}>{token ? "logout" : "login"}</button>
      </div>

      <p>{message}</p>

      <Authors
        show={page === 'authors'}
        setMessage={(value) => displayNotification(value)}
      />

      <Books
        show={page === 'books'}
        setMessage={(value) => displayNotification(value)}
      />

      <NewBook
        show={page === 'add'}
        setMessage={(value) => displayNotification(value)}
      />

      <Login
        show={page === 'login'}
        setMessage={(value) => displayNotification(value)}
        successfullLogin={successfullLogin}
      />

    </div>
  )
}

export default App