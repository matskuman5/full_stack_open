const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const testHelper = require('./test_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }]

const blogToAdd = {
  _id: '5a422b891b54a676234d17fa',
  title: 'First class tests',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  likes: 10,
  __v: 0
}

beforeAll(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
})

describe('get', () => {

  test('blogs returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect('Content-Type', /application\/json/)
  })

  test('returns three blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogs.length)
  })

  test('returned blogs contain id field', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })

})

describe('post', () => {

  test('adding a blog returns correct code and JSON', async () => {
    await api
      .post('/api/blogs')
      .send(blogToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('adding a blog increases amount of blogs by one', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogs.length + 1)
  })

  test('adds correct blog to the blog list', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toContainEqual(
      { id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0 })
  })

  test('blog with no likes specified is defaulted to 0', async () => {
    await api
      .post('/api/blogs')
      .send({
        id: '62b37ef967df6f13c46f49a6',
        title: 'test blog with 0 likes',
        author: 'test',
        url: '3482194812',
        __v: 0
      })

    const response = await api.get('/api/blogs')
    expect(response.body[4].likes).toBe(0)

  })

  test('blog missing url returns 400', async () => {
    await api
      .post('/api/blogs')
      .send({
        'title': 'no url',
        'author': 'error man',
        'likes': 5
      })
      .expect(400)
  })

})

describe('delete', () => {

  test('deleting a blog successfully returns 204 and removes correct blog', async () => {
    const initialBlogs = await testHelper.blogsInDb()
    const blogToDelete = initialBlogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const finalBlogs = await testHelper.blogsInDb()
    expect(finalBlogs).toHaveLength(initialBlogs.length - 1)
    expect(finalBlogs).not.toContainEqual(blogToDelete)

  })

})

afterAll(() => {
  mongoose.connection.close()
})
