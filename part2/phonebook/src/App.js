import React, { useState, useEffect } from 'react';
import contacts from './services/contacts';

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message" style={{display: message ? 'block' : 'none'}}>
      {message}
    </div>
  )
}

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

const Persons = ({filterPersons, handleDelete}) => filterPersons.map(fp => {

  const handleDeleteClick = (name, id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      handleDelete(id);
    }
  }

  return (
      <p key={fp.name}>{fp.name} {fp.number} <button onClick={() => handleDeleteClick(fp.name, fp.id)}>delete</button></p>
  )
})

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    contacts.getAll().then((response) => setPersons(response.data.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))))
  },[])

  const addPerson = (event) => {
    event.preventDefault();
    const names = persons.map(person => person.name);

    if (!names.includes(newName)) {
      contacts.create({name: newName, number: newNumber}).then(response => {
        setMessage(`${newName} added in the phonebook`)
        setPersons([...persons].concat(response.data))
        setTimeout(() => setMessage(null), 2000)
      }).catch(error => {
        setMessage(error)
        setTimeout(() => setMessage(null), 2000)
      })
    } else {
      if (window.confirm(`${newName} already exists in the phonebook, replace the old number with the new one?`)) {
        const existingPerson = persons.find(person => person.name === newName)
        contacts.update(existingPerson.id, {...existingPerson, number: newNumber}).then(response => {
          setMessage(`${newName} person contact number is updated.`)
          setPersons(persons.map(person => (person.id === existingPerson.id && person.number !== newNumber) ? response.data : person))
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (id) => {
    setMessage(`Person with id ${id} is deleted from the contacts.`)
    contacts.deleteContact(id).then(setPersons(persons.filter(person => person.id !== id))).catch(error => setMessage(`Person with id ${id} is already deleted from the server.`))
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

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
      <Notification message={message}/>
      <h2>Phonebook</h2>
      <Filter onChangeAction={onChangeAction} value={filter}/>
      <h2>add a new</h2>
      <PersonForm onChangeAction={onChangeAction} newName={newName} newNumber={newNumber} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons filterPersons={persons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App;
