import { useState, useEffect } from 'react'
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
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogVisible, setNewBlogVisible] = useState(false)
  const [notification, setNotification] = useState('')

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

  const createBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
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

  const getNewBlogForm = () => {
    const hideWhenVisible = { display: newBlogVisible ? 'none' : ''}
    const showWhenVisible = { display: newBlogVisible ? '' : 'none'}

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setNewBlogVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <NewBlogForm 
            handleSubmit={createBlog}
            handleTitleChange={({ target }) => setNewBlogTitle(target.value)}
            handleAuthorChange={({ target }) => setNewBlogAuthor(target.value)}
            handleUrlChange={({ target }) => setNewBlogUrl(target.value)}

            author={newBlogAuthor}
            title={newBlogTitle}
            url={newBlogUrl}
          />
          <button onClick={() => setNewBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )

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
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                  name="username"
                />
              </div>
              <div>
                password
                <input
                  type={password}
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  name="password"
                />
              </div>
              <button type="submit">login</button>
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
