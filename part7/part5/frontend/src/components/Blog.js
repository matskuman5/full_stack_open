import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {

  Blog.propTypes = {
    blog: PropTypes.object.isRequired
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }

  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const like = () => {
    try {
      blogService.likeBlog(blog)
    } catch (exception) {
      console.error(exception)
    }
  }

  const deleteThisBlog = () => {
    if (window.confirm(`really delete ${blog.title}?`)) {
      try {
        blogService.deleteBlog(blog)
      } catch (exception) {
        console.error(exception)
      }
    }
  }

  return (
    <div style={blogStyle}>
      {expanded
        ? <div>
          <button onClick={toggleExpanded}>{blog.title}</button>
          <div className='expandedInfo'>
            <p>
                author: {blog.author}
            </p>
            <p>
                url: {blog.url}
            </p>
            <p>
                likes: {blog.likes}
              <button onClick={like}>like</button>
            </p>
            <p>
                added by: {blog.user.name}
            </p>
            {/* if not logged in, or if logged in as someone other than the blog's author,
            show only 'hello', otherwise show the delete button */}
            {!window.localStorage.getItem('loggedUser')||JSON.parse(window.localStorage.getItem('loggedUser')).username === blog.user.username
              ? <button onClick={deleteThisBlog}>delete</button>
              : 'hello'}
          </div>
        </div>
        : <div>
          <button onClick={toggleExpanded}>{blog.title}</button>
        </div>
      }
    </div>
  )
}

export default Blog