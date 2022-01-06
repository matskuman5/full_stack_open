import React, { useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personServices from './services/personServices'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personServices.getAll()
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
      if (window.confirm(`${newName} is already added to the phonebook. Replace the old number?`)) {
        updatePerson()
      }
      return
    }

    console.log('adding', newName)

    const personObject = {
      name: newName,
      number: newNumber,
    }

    personServices.add(personObject)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(personObject))
        setNotificationMessage(`${personObject.name} added successfully`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)

        // update data from the server so we get the id's
        personServices.getAll()
        .then(response => {
          setPersons(response.data)
        })
      })

    setNewName('')
    setNewNumber('')
  }

  const updatePerson = () => {
    const oldPerson = persons.find(p => p.name === newName)
    const changedPerson = {...oldPerson, number: newNumber}

    personServices.update(changedPerson.id, changedPerson)
      .then(response => {
        console.log(response)
        setPersons(persons.map(p => p.id !== changedPerson.id ? p : response.data))
        setNotificationMessage(`${changedPerson.name} updated successfully`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(() => {
        setPersons(persons.filter(p => p.name !== changedPerson.name))
        setNotificationMessage(`Error: ${changedPerson.name} has already been deleted from the database`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  const deletePerson = (name) => {

    if (!window.confirm(`Do you really want to remove ${name}?`)) {
      return
    }

    const id = persons.find(p => p.name === name).id
    console.log(`removing name: ${name}, id: ${id}`)

    personServices._delete(id)
      .then(response => {
        console.log(response)
        setPersons(persons.filter(p => p.name !== name))
        setNotificationMessage(`${name} removed successfully`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage}
      />
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