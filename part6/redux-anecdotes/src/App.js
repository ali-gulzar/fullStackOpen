import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initData } from './reducers/anecdoteReducer' 

import ConnectAnectodeList from './components/AnectodeList'
import AnectodeForm from './components/AnectodeForm'
import ConnectNotification from './components/Notification'
import ConnectFilter from './components/Filter'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initData())
  },[dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <ConnectNotification />
      <ConnectFilter />
      <ConnectAnectodeList />
      <AnectodeForm />
    </div>
  )
}

export default App