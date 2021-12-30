import React from 'react';

const Total = ({parts}) => {
    
    const e  = parts.map(p => p.exercises)
    const total = e.reduce((p, c) => p + c)

    return (
      <p>Number of exercises {total}</p>
    )
}

export default Total