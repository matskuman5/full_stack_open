import AnecdoteForm from './components/AnecdoteList'
import AnecdoteList from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <Notification/>
      <AnecdoteForm/>
      <AnecdoteList/>
    </div>
  )
}

export default App