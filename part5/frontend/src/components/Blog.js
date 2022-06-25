import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog}) => {

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
            <div>
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
              <button onClick={deleteThisBlog}>delete</button>
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