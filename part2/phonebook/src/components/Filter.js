import React from 'react';

const Filter = (props) => {
    return (
        <p>
            filter: <input
            value={props.newFilter}
            onChange={props.handleFilterChange}/>
        </p>
    )
}

export default Filter