import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('by default shows only title', () => {
  const blog = {
    title: 'test blog',
    author: 'test person',
    url: 'http something',
    likes: 5
  }

  const { container } = render(<Blog blog={blog} />)

  screen.getByText('test blog')
  expect(container).not.toHaveTextContent('test person')

})