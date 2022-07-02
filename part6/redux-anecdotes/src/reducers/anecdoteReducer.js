const anecdotesAtStart = [
  {
    content: 'If it hurts, do it more often',
    id: '123456',
    votes: 0
  },
  {
    content: 'Adding manpower to a late software project makes it later!',
    id: '100000',
    votes: 1
  },
  {
    content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    id: '111111',
    votes: 3
  }
]

export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const addAnecdote = (anecdote) => {
  return {
    type: 'ADD',
    data: { anecdote }
  }
}

const initialState = anecdotesAtStart

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdote = state.find(a => a.id === id)
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map(a => a.id !== id ? a : updatedAnecdote)
    case 'ADD':
      return state.concat(action.data.anecdote)
    default:
      return state
  }

}

export default reducer