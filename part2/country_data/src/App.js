import React, {useState, useEffect} from 'react';
import axios from 'axios'

function App() {

  const [newSearch, setNewSearch] = useState('')

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      find countries:
      <input
        value={newSearch}
        onChange={handleSearchChange}/>
    </div>
  );
}

export default App;