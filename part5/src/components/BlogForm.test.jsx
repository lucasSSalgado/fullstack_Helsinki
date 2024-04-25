import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { expect, vi } from 'vitest'
import blogService from '../services/blogs'

test('clicking the button calls event handler once', async () => {
  const newBlog = true
  const user = {}
  const setNewBlog = vi.fn()

  render(<BlogForm newBlog={newBlog} setNewBlog={setNewBlog} user={user} />)

  blogService.createBlog = vi.fn()

  const client = userEvent.setup()

  const input = screen.getAllByRole('textbox')
  const button = screen.getByText('create')

  await client.type(input[0], 'title')
  await client.type(input[1], 'author')
  await client.type(input[2], 'url')
  await client.click(button)

  expect(setNewBlog).toHaveBeenCalledTimes(1)
})