import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({onChangeAction, value}) => {
  return (
    <form>
      <div>
        filter shown with <input value={value} onChange={(event) => onChangeAction(event, "filter")} />
      </div>
    </form>
  )
}

const PersonForm = ({onChangeAction, newName, newNumber, addPerson}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={(event) => onChangeAction(event, "name")} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(event) => onChangeAction(event, "number")}/>
      </div>
      <div>
        <button type="submit" onClick={addPerson}>add</button>
      </div>
    </form>
  )
}

const Persons = ({filterPersons}) => filterPersons.map(fp => <p key={fp.name}>{fp.name} {fp.number}</p>)

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
    .then((response) => console.log(response.data))
  },[])

  const addPerson = (event) => {
    event.preventDefault();
    const names = persons.map(person => person.name);
    if (!names.includes(newName)) {
      setPersons([...persons].concat({name: newName, number: newNumber}))
    } else {
      alert(`${newName} already exists in the phonebook!`)
    }
    setNewName('')
    setNewNumber('')
  }

  const filterPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const onChangeAction = (event, type) => {
    if (type === "filter") {
      setFilter(event.target.value)
    } else if (type === "name"){
      setNewName(event.target.value)
    } else {
      setNewNumber(event.target.value)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChangeAction={onChangeAction} value={filter}/>
      <h2>add a new</h2>
      <PersonForm onChangeAction={onChangeAction} newName={newName} newNumber={newNumber} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons filterPersons={filterPersons}/>
    </div>
  )
}

export default App;
