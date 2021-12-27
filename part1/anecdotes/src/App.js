import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [points, setVotes] = useState(new Uint8Array(anecdotes.length))

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVotes = () => {
    let most = 0
    let mostIndex = 0

    for (let i = 0; i < points.length; i++) {
      if (points[i] > most) {
        most = points[i]
        mostIndex = i
      }
    }

    return mostIndex

  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]}
      </p>
      <p>
        has {points[selected]} votes
      </p>
      <button onClick={voteAnecdote}>
        vote
      </button>
      <button onClick={randomAnecdote}>
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <p>
        {anecdotes[mostVotes()]}
      </p>
      <p> 
        has {points[mostVotes()]} votes
      </p>
    </div>
  )
}

export default App