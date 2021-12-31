import React from 'react';

const Persons = (props) => {
    return (
        <div>
            {props.personsToShow.map(p =>
                <p key={p.name}>
                {p.name} {p.number}
                </p>)}
        </div>
    )
}

export default Persons