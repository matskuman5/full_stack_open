import React from 'react';
import Country from './Country'

const Countries = ({countries, setNewSearch}) => {

    const showCountry = (event) => {
        console.log('pressed', event.target.id)
        setNewSearch(countries.filter(c => c.name.common.includes(event.target.id))[0].name.common)
    }

    if (countries.length > 10) {
        return (
            <div>
                Too many matches, use another filter
            </div>
        )
    }
    
    if (countries.length === 1) {
        return (
            <Country countryToPrint = {countries[0]}/>
        )
    }

    return (
        <div>
            {countries.map(c => 
                <p key={c.name.common}>{c.name.common}
                <button id={c.name.common} onClick={showCountry}>
                show
                </button>
                </p>)}
        </div>
    )
    
}

export default Countries