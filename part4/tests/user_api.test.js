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