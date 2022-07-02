import { addAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const add = (event) => {
        event.preventDefault()
        const anecdote = {
          content: event.target.content.value,
          id: Number((Math.random() * 100000).toFixed(0)),
          votes: 0
        }
        event.target.content.value = ''
        dispatch(addAnecdote(anecdote))
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <input name="content"/>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm