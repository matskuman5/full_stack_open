describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const testUser = {
      name: 'testname',
      username: 'testusername',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users', testUser)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('Login')
  })

  describe('logging in', function() {

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testusername')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()

      cy.contains('Logged in as testname')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrongusername')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.contains('invalid username or password')
    })

  })

  describe('while logged in', function() {

    beforeEach(function() {
      cy.login({ username: 'testusername', password: 'testpassword' })
    })

    it('can create new blog', function() {
      cy.get('#new-blog-button').click()
      cy.get('#title-input').type('test title')
      cy.get('#author-input').type('test author')
      cy.get('#url-input').type('test url')
      cy.get('#submit-button').click()

      cy.contains('created new blog "test title"')

    })

    describe('and a blog exists', function() {

      beforeEach(function() {
        cy.createBlog({ title: 'test blog', author: 'test author', url: 'test url' })
      })

      it('shows the blog', function() {
        cy.contains('test blog')
      })

      it('can click the blog to expand', function() {
        cy.contains('test blog').click()
        cy.contains('test author')
        cy.contains('test url')
      })

      it('can like the blog successfully', function() {
        cy.contains('test blog').click()
        cy.contains('like').click()
        cy.reload()
        cy.contains('test blog').click()
        cy.contains('likes: 1')
      })

      it('can delete the blog', function() {
        cy.contains('test blog').click()
        cy.contains('delete').click()
        cy.on('window:confirm', () => true)
        cy.reload()
        cy.contains('test blog').should('not.exist')
      })

    })

  })

})