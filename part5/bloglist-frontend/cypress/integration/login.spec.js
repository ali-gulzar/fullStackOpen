describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.request('POST', 'http://localhost:3001/api/users', { username: 'ali', name: 'Muhammad Ali Gulzar', password: 'simpletesting' })
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Login Form')
    })

    describe('Login', function () {
        it('login successfull', function() {
            cy.get('#username').type('ali')
            cy.get('#password').type('simpletesting')
            cy.contains('login').click()
            cy.contains('Muhammad Ali Gulzar logged in')
        })

        it('login failed', function() {
            cy.get('#username').type('ali')
            cy.get('#password').type('simple')
            cy.contains('login').click()
            cy.contains('Login Form')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.request('POST', 'http://localhost:3001/api/login', { username: 'ali', password: 'simpletesting' }).then(response => {
                localStorage.setItem('loggedInUser', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
            })
        })

        it('sucessfully creates a blog', function() {
            cy.get('.addBlogButton').click()
            cy.get('#title').type('test title')
            cy.get('#author').type('test author')
            cy.get('#url').type('test url')
            cy.get('.addItButton').click()
            cy.contains('test title')
        })

        it('likes a blog', function() {
            cy.get('.addBlogButton').click()
            cy.get('#title').type('test title')
            cy.get('#author').type('test author')
            cy.get('#url').type('test url')
            cy.get('.addItButton').click()
            cy.get('.showBlogButton').click()

            cy.get('.likeButton').click()
            cy.contains('1')
        })

        it('deletes a blog', function() {
            cy.get('.addBlogButton').click()
            cy.get('#title').type('test title')
            cy.get('#author').type('test author')
            cy.get('#url').type('test url')
            cy.get('.addItButton').click()
            cy.get('.showBlogButton').click()

            cy.get('.deleteButton').click()
        })

        it('unauthorized user tries to delete a blog', function() {
            cy.get('.addBlogButton').click()
            cy.get('#title').type('test title')
            cy.get('#author').type('test author')
            cy.get('#url').type('test url')
            cy.get('.addItButton').click()
            cy.get('.logoutButton').click()

            cy.request('POST', 'http://localhost:3001/api/users', { username: 'ali2', name: 'Muhammad Ali Gulzar', password: 'simpletesting' })
            cy.request('POST', 'http://localhost:3001/api/login', { username: 'ali2', password: 'simpletesting' }).then(response => {
                localStorage.setItem('loggedInUser', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
            })

            cy.get('.showBlogButton').click()
        })

        it('order of blogs are in ascending order', function() {
            cy.get('.addBlogButton').click()

            // Blog 1
            cy.get('#title').type('test title')
            cy.get('#author').type('test author')
            cy.get('#url').type('test url')
            cy.get('.addItButton').click()

            cy.wait(2000)

            // Blog 2
            cy.get('#title').type('test title 1')
            cy.get('#author').type('test author 1')
            cy.get('#url').type('test url 1')
            cy.get('.addItButton').click()

            cy.wait(2000)

            cy.get('.showBlogButton').eq(1).click()
            cy.get('.likeButton').click()
            cy.wait(2000)

            cy.contains('1')

        })

    })
})