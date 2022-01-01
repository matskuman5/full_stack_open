import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
    }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = newFilter.length === 0
    ? persons
    : persons.filter(p => p.name.includes(newFilter))

  const addPerson = (event) => {
    console.log('hello', event.target)
    event.preventDefault()

    // check if the name already exists in the phonebook
    if (persons.find(p => p.name === newName)) {
      window.alert(`${newName} is already added to the phonebook`)
      return
    }

    console.log('adding', newName)

    const personObject = {
      name: newName,
      number: newNumber
    }

    axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(personObject))
    })

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (name) => {

    console.log(`removing name: ${name}`)

    setPersons(persons.filter(p => p.name !== name))

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Filter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <Persons
        personsToShow = {personsToShow} deleteFunction = {deletePerson}
      />
    </div>
  )
}

export default App