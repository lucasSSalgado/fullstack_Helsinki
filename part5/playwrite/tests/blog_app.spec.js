const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, creatBlogMika } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })
})
describe('Login', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'mika',
                username: 'mika',
                password: '12345'
            }
        })
    })
    
    test('succeeds with correct credentials', async ({ page }) => {
      await page.goto('http://localhost:5173')
      await page.getByRole('textbox').first().fill('mika')
      await page.getByRole('textbox').last().fill('12345')
      await page.getByRole('button', { name: 'login' }).click()
  
      await expect(page.getByText('mika logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await page.goto('http://localhost:5173')
        await page.getByRole('textbox').first().fill('mika')
        await page.getByRole('textbox').last().fill('1235')
        await page.getByRole('button', { name: 'login' }).click()
    
        await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
})
describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'mika',
                username: 'mika',
                password: '12345'
            }
        })
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'luca',
                username: 'luca',
                password: '123'
            }
        })

        await page.goto('http://localhost:5173')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await loginWith(page, 'mika', '12345')

      await page.getByRole('button', { name: 'new blog' }).click()
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('my title')
      await textboxes[1].fill('mika')
      await textboxes[2].fill('url')
      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('A new blog: my title by mika added')).toBeVisible()
    })

    test('blog can be liked', async ({ page }) => {
        await loginWith(page, 'mika', '12345')

        await page.getByRole('button', { name: 'new blog' }).click()
        const textboxes = await page.getByRole('textbox').all()
        await textboxes[0].fill('my title')
        await textboxes[1].fill('mika')
        await textboxes[2].fill('url')
        await page.getByRole('button', { name: 'create' }).click()

        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('Likes 1')).toBeVisible()
    })

    test('blog can be deleted', async ({ page }) => {
        await loginWith(page, 'mika', '12345')
    
        await page.getByRole('button', { name: 'new blog' }).click()
        const textboxes = await page.getByRole('textbox').all()
        await textboxes[0].fill('my title')
        await textboxes[1].fill('mika')
        await textboxes[2].fill('url')
        await page.getByRole('button', { name: 'create' }).click()
        await page.getByRole('button', { name: 'view' }).click()
        page.on('dialog', dialog => {
            dialog.accept()
        })
        await page.getByRole('button', { name: 'remove' }).click()
        await page.waitForTimeout(5000)

        await expect(page.getByText('my title')).toBeHidden()
    })

    test('only the creator can see the delete button', async ({ page, request }) => {
        await creatBlogMika(page, 'mika title', 'mika', 'url')

        await loginWith(page, 'luca', '123')
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).toBeHidden()
    })

    test('blogs are ordered according to likes', async ({ page }) => {
        await creatBlogMika(page, 'mika title', 'mika', 'url')

        await loginWith(page, 'luca', '123')
        // like mika blog 
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        // create luca blog
        await page.getByRole('button', { name: 'new blog' }).click()
        const textboxes = await page.getByRole('textbox').all()
        await textboxes[0].fill('luca title')
        await textboxes[1].fill('lucaS')
        await textboxes[2].fill('url')
        await page.getByRole('button', { name: 'create' }).click()
        await expect(page.getByText('Likes 1')).toBeVisible()
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('Likes 0')).toBeVisible()
    })
})