import React from 'react';

const Country = ({countryToPrint}) => {

    let lang = []
    for (const key in countryToPrint.languages) {
        lang.push(countryToPrint.languages[key])
    }
    console.log(lang)

    return (
        <div>
            <h2>{countryToPrint.name.common}</h2>
            <p>capital: {countryToPrint.capital}</p>
            <p>region: {countryToPrint.region}</p>
            <h3>languages: </h3>
            <ul>
                {lang.map(l =>
                    <li key={l}>{l}</li>)}
            </ul>
            <img src={countryToPrint.flags.png}></img>
        </div>
    )

}

export default Country