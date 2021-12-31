import React from 'react';
import Country from './Country'

const Countries = ({countries}) => {

    console.log('hi', countries)
    console.log('heres the length', countries.length)

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
                <p key={c.name.common}>{c.name.common}</p>)}
        </div>
    )
    
}

export default Countries