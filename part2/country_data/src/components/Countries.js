import React from 'react';

const Countries = ({countries}) => {
    return (
        <div>
            {countries.map(c => 
                <p key={c.name.common}>{c.name.common}</p>)}
        </div>
    )
}

export default Countries