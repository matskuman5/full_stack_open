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
    console.log(response.body)
    expect(response.body).toHaveLength(1)

  })

})

afterAll(() => {
  mongoose.connection.close()
})