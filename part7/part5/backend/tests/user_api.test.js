const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

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

  test('malformatted username returns 400', async () => {

    await api
      .post('/api/users')
      .send({
        name: 'john doe',
        password: 'secret'
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/users')
      .send({
        username: 'jo',
        name: 'john doe',
        password: 'secret'
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)

  })

  test('malformatted password returns 400', async () => {

    await api
      .post('/api/users')
      .send({
        username: 'john doe',
        name: 'john doe'
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/users')
      .send({
        username: 'john doe',
        name: 'john doe',
        password: '12'
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)

  })

  test('already existing username returns 400', async () => {

    await api
      .post('/api/users')
      .send({
        username: 'unique',
        name: 'john doe',
        password: 'secret'
      })

    await api
      .post('/api/users')
      .send({
        username: 'unique',
        name: 'john doe 2',
        password: 'secret 2'
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)

  })

})

afterAll(() => {
  mongoose.connection.close()
})