import { addVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { show, hide } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes))
    const dispatch = useDispatch()
    
    const vote = (id) => {
        console.log('vote', id)
        const content = anecdotes.find(a => a.id === id).content
        dispatch(show(`voted ${content}`))
        setTimeout(() => {
            dispatch(hide(''))
        }, 5000)
        dispatch(addVote(id))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
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