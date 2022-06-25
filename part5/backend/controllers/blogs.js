const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')
const { result } = require('lodash')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find()
    .populate('user', { username: 1, name: 1, id: 1 })
  res.json(blogs)
})

blogsRouter.post('/', userExtractor, async (req, res) => {

  const body = req.body

  if (!req.user) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: req.user._id
  })

  const savedBlog = await blog.save()
  req.user.blogs = req.user.blogs.concat(savedBlog._id)
  await req.user.save()
  res.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const blogToDelete = await Blog.findById(req.params.id)
  if (!blogToDelete ) {
    return res.status(204).end()
  }

  if ( blogToDelete.user && blogToDelete.user.toString() !== req.user.id ) {
    return res.status(401).json({
      error: 'only the creator can delete a blog'
    })
  }

  await Blog.findByIdAndRemove(req.params.id)

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