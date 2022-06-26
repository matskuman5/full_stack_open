import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogVisible, setNewBlogVisible] = useState(false)
  const [notification, setNotification] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( sortedBlogs )
    }

    )
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
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

      setNotification('logged in')
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    } catch (exception) {
      setNotification(`error: ${exception.response.data.error}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      console.error(exception)
    }

  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setNotification('logged out')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const blogFormRef = useRef()

  const getNewBlogForm = () => {

    const hideWhenVisible = { display: newBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: newBlogVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setNewBlogVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <NewBlogForm
            handleSubmit={createBlog}
            ref={blogFormRef}
          />
          <button onClick={() => setNewBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )

  }

  const createBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        title: blogFormRef.current.title,
        author: blogFormRef.current.author,
        url: blogFormRef.current.url
      }
      await blogService.createNew(blog)
      setNewBlogVisible(false)
      setNotification(`created new blog "${blog.title}"`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification(`error: ${exception.response.data.error}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      console.error(exception)
    }
  }

  return (
    <div>
      <Notification message={notification} />
      <div>
        {user === null
          ? <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div>
                username
                <input
                  id='username'
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                  name="username"
                />
              </div>
              <div>
                password
                <input
                  id='password'
                  type={password}
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  name="password"
                />
              </div>
              <button id='login-button' type="submit">login</button>
            </form>
          </div>
          : <div>
            Logged in as {user.name}
            <button onClick={handleLogout}>logout</button>
            {getNewBlogForm()}

            <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
        }
      </div>
    </div>


  )
}

export default App
