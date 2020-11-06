import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Blog from './Blog'

describe('<Blog />', () => {

    const blog = {
        id: 0,
        title: 'Test title',
        author: 'Test author',
        url: 'Test url',
        likes: 20,
        user: {
            id: 0,
            name: 'Test name',
            username: 'Test username'
        }
    }

    const user = {
        id: 0,
        username: 'Test username',
        name: 'Test name'
    }

    const mockHandler = jest.fn()

    test('renders title and not likes', () => {

        const component = render(
            <Blog blog={blog} setMessage={mockHandler} user={user} />
        )

        const blogDiv = component.container.querySelector('.blogDiv')
        expect(blogDiv).toBeDefined()

        const detailDiv = component.container.querySelector('.detailDiv')
        expect(detailDiv).toBeNull()
    })

    test('render details when show button clicked', () => {

        const component = render(
            <Blog blog={blog} setMessage={mockHandler} user={user} />
        )

        const button = component.getByText('show')
        fireEvent.click(button)

        const detailDiv = component.container.querySelector('.detailDiv')
        expect(detailDiv).toBeDefined()
    })

    test('make a new blog', () => {

        const component = render(
            <Blog blog={blog} setMessage={mockHandler} user={user} />
        )

        const button = component.getByText('show')
        fireEvent.click(button)

        const detailDiv = component.container.querySelector('.detailDiv')
        expect(detailDiv).toBeDefined()
    })
})