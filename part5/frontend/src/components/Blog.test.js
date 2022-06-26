import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('visibility', () => {

  let container

  beforeEach(() => {
    const blog = {
      title: 'test blog',
      author: 'test person',
      url: 'http something',
      likes: 5
    }

    container = render(<Blog blog={blog} />).container
  })

  test('by default shows only title', () => {

    screen.getByText('test blog')
    expect(container).not.toHaveTextContent('test person')

  })
})

