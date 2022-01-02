import React from 'react';

const Notification = ({message}) => {

    if (message === null) {
        return null
    }

    let divStyle = {
        fontWeight: 'bold',
        fontSize: 24,
        borderStyle: 'solid',
        borderRadius: 3
    }

    message.startsWith('Error:')
    ? divStyle.color = 'red'
    : divStyle.color = 'green'

    return (
        <div style={divStyle}>
            {message}
        </div>
    )

}

export default Notification