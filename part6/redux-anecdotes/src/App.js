import React from 'react'
import AnectodeList from './components/AnectodeList'
import AnectodeForm from './components/AnectodeForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {


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