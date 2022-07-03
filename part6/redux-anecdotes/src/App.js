import AnecdoteForm from './components/AnecdoteList'
import AnecdoteList from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll()
      .then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <Notification/>
      <AnecdoteForm/>
      <AnecdoteList/>
    </div>
  )
}

export default App