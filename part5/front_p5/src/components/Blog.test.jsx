import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect, vi } from 'vitest'
import blogService from '../services/blogs'

test('renders title and author exists and likes and url no', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0
  }
  const user = {}
  const setUserblog = () => {}

  let container = render(<Blog blog={blog} user={user} setUserblog={setUserblog} />).container

  const element = screen.getByText('title - author')
  const hiden = container.querySelector('.hiden')

  expect(element).toBeDefined()
  expect(hiden).toBeNull()
})

test('renders likes and url no exists before click', async () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0
  }
  const user = {}
  const setUserblog = () => {}
  let container = render(<Blog blog={blog} user={user} setUserblog={setUserblog} />).container

  const client = userEvent.setup()
  const button = screen.getByText('view')
  await client.click(button)



  expect(container.querySelector('.likes')).toBeDefined()
  expect(container.querySelector('.url')).toBeDefined()
})

test('clicking like twice calls event handler twice', async () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0
  }
  const user = {}
  const setNewBlog = vi.fn()

  blogService.likeBlog = vi.fn()
  render(<Blog blog={blog} user={user} setNewBlog={ setNewBlog } />)

  const client = userEvent.setup()
  const button = screen.getByText('view')
  await client.click(button)

  const like = screen.getByText('like')
  await client.click(like)
  await client.click(like)
  expect(setNewBlog).toHaveBeenCalledTimes(2)
})