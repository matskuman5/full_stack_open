import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Countries from './components/Countries'

function App() {

  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState([])

  // load countries from API
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      find countries:
      <input
        value={newSearch}
        onChange={handleSearchChange}/>
    <h2>Results</h2>
    <Countries countries = {countries}/>
    </div>
  );
}

export default App;