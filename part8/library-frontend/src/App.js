import React, { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED } from './graphql/subscription'
import { GET_ALL_BOOKS } from './graphql/queries'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'

const App = () => {
  const [page, setPage] = useState('books')
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState('')
  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('user-token'))
  },[])

  const updateCacheWith = (addedBook) => {
    const includedIn = (data, object) => {
      data.map(p => p.id).includes(object.id) 
    } 


    const dataInStore = client.readQuery({ query: GET_ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: GET_ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      setMessage(`${addedBook.title} added!`)
      setTimeout(() => {
        setMessage('')
      }, 2000)
      updateCacheWith(addedBook)
    }
  })

  const displayNotification = (value) => {
    setMessage(value)
    setTimeout(() => {
        setMessage('')
    }, 5000);
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

  const renderLoggedInView = () => {
    return (
      <>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
      </>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? renderLoggedInView() : ''}
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

      <Recommended
        show={page === 'recommended'}
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