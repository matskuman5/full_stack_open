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
    blogService.likeBlog(blog)
  }

  return (
    <div style={blogStyle}>
      {expanded
        ? <div>
            <button onClick={toggleExpanded}>{blog.title}</button>
            <div>
              <p>
                {blog.url}
              </p>
              <p>
                {blog.likes}
                <button onClick={like}>like</button>
              </p>
              <p>
                {blog.author}
              </p>
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