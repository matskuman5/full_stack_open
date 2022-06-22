const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

test('blogs returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})