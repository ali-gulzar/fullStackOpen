import React from 'react'
import AnectodeList from './components/AnectodeList'
import AnectodeForm from './components/AnectodeForm'

const App = () => {


  return (
    <div>
      <h2>Anecdotes</h2>
      <AnectodeList />
      <AnectodeForm />
    </div>
  )
}

export default App