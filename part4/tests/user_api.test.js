const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const testHelper = require('./test_helper')

describe('get', () => {

  test('users returned as JSON', async () => {
    await api
      .get('/api/users')
      .expect('Content-Type', /application\/json/)
  })

})

describe('post', () => {

  beforeAll(async () => {
    await User.deleteMany()
  })

  test('successfully adding user works correctly', async () => {
    await api
      .post('/api/users')
      .send({
        username: 'test',
        name: 'john doe',
        password: 'secret'
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(1)

  })

  test('trying to add a user without username returns 400', async () => {
    await api
      .post('/api/users')
      .send({
        name: 'john doe',
        password: 'secret'
      })
      .expect(400)
  })

  test('trying to add a user without password returns 400', async () => {
    await api
      .post('/api/users')
      .send({
        username: 'john doe',
        name: 'john doe'
      })
      .expect(400)
  })

})

afterAll(() => {
  mongoose.connection.close()
})