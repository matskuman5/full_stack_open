import React from 'react';
import Part from './Part'

const Content = ({parts}) => {
    console.log(parts)
    return (
      <div>
        {parts.map(p => 
            <Part key={p.id} part={p.name} exercises={p.exercises} />
            )}
      </div>
    )
}

export default Content