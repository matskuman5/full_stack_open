import { useState, useImperativeHandle, forwardRef } from 'react'

const NewBlogForm = forwardRef((props, ref) => {

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
          />
          </div>
          <div>
          author
            <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          </div>
          <div>
          url
            <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          </div>
          <button type="submit">create</button>
        </form>
     </div>
   )
 })
 
 export default NewBlogForm