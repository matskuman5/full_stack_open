import { useState } from 'react'

const Blog = ({blog}) => {

  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <div>
      {expanded
        ? <div>
            <button onClick={toggleExpanded}>{blog.title}</button>
            <div>
              <p>
                {blog.url}
              </p>
              <p>
                {blog.likes}
                <button>like</button>
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