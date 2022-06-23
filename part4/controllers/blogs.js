const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find()
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(res.body)
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const blog = {
    likes: req.body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog)

  res.json(updatedBlog)
})

module.exports = blogsRouter