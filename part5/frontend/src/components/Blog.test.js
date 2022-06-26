import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('visibility', () => {

  let container

  beforeEach(() => {
    const blog = {
      title: 'test blog',
      author: 'test person',
      url: 'http something',
      user: {
        name: 'johnny test',
        username: 'johnny505'
      },
      likes: 5
    }
    container = render(<Blog blog={blog} />).container
  })

  test('by default shows only title', () => {
    screen.getByText('test blog')
    expect(container).not.toHaveTextContent('test person')
  })

  test('shows expanded info after clicking title', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('test blog')
    await user.click(button)

    expect(container).toHaveTextContent('test person')
  })

})

