import React from 'react';

const Countries = ({countries}) => {

    if (countries.length > 10) {
        return (
            <div>
                Too many matches, use another filter
            </div>
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