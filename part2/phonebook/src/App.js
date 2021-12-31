import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleFormChange = (event) => {
    setNewName(event.target.value)
  }

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
      name: newName
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleFormChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(p =>
          <p key={p.name}>
            {p.name}
          </p>)}
      </div>
    </div>
  )
}

export default App