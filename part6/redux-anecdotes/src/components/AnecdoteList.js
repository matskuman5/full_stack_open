import { voteOnAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { show, hide } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const state = useSelector(s => s)
    const getAnecdotes = state => state.anecdotes
    const sortedAnecdotes = [...getAnecdotes(state)]
    sortedAnecdotes.sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()
    
    const vote = (id) => {
        console.log('vote', id)
        const anecdote = sortedAnecdotes.find(a => a.id === id)
        dispatch(show(`voted ${anecdote.content}`))
        setTimeout(() => {
            dispatch(hide(''))
        }, 5000)
        dispatch(voteOnAnecdote(anecdote))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>)}
        </div>
    )
}

export default AnecdoteList