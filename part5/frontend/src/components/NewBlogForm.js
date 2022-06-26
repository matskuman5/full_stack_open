import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = forwardRef((props, ref) => {

  NewBlogForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useImperativeHandle(ref, () => {
    return {
      title,
      author,
      url
    }
  })

  return (
    <div>
      <h2>create new blog</h2>

      <form onSubmit={props.handleSubmit}>
        <div>
        title
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id='title-input'
          />
        </div>
        <div>
        author
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id='author-input'
          />
        </div>
        <div>
        url
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id='url-input'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
})

NewBlogForm.displayName = 'NewBlogForm'

export default NewBlogForm