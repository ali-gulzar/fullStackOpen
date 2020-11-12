import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import anectodeService from './services/anectodes'
import { initData } from './reducers/anecdoteReducer' 

import AnectodeList from './components/AnectodeList'
import AnectodeForm from './components/AnectodeForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    anectodeService.getAll().then(anectodes => dispatch(initData(anectodes)))
  },[dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnectodeList />
      <AnectodeForm />
    </div>
  )
}

export default App