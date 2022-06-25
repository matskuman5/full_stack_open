import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('attempting login as', username, password)

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error('wrong credentials')
    }

  }

  const handleLogout = () => {
    console.log('logging out', user.name)
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <div>
      {user === null
      ? <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      : <div>
          Logged in as {user.name}
          <button onClick={handleLogout}>logout</button>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
      
  )
}

export default App
