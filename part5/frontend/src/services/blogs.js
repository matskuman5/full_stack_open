import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const createNew = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  console.log('attempting to add new blog', baseUrl, newBlog, config)

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const likeBlog = async blog => {
  const newBlog = {
    ...blog,
    likes: blog.likes + 1,
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, newBlog)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { setToken, getAll, createNew, likeBlog }