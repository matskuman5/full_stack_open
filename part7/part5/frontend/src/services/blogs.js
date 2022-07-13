import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const createNew = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  console.log("attempting to add new blog", baseUrl, newBlog, config);

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const likeBlog = async (blog) => {
  const newBlog = {
    user: blog.user._id,
    author: blog.author,
    title: blog.title,
    url: blog.url,
    likes: blog.likes + 1,
  };
  console.log(blog, newBlog);
  const response = await axios.put(`${baseUrl}/${blog.id}`, newBlog);
  return response.data;
};

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  console.log("attempting to delete blog", blog, config);
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return response.data;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { setToken, getAll, createNew, likeBlog, deleteBlog };
