import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '1234'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}/>
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <p>
        filter: <input
          value={newFilter}
          onChange={handleFilterChange}/>
      </p>
      <div>
        {personsToShow.map(p =>
          <p key={p.name}>
            {p.name} {p.number}
          </p>)}
      </div>
    </div>
  )
}

export default App