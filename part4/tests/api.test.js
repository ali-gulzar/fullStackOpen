const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blogs');

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('check the existence of key id in a document', async () => {
  let blogs = await Blog.find({})
  if (blogs.length !== 0) {
    expect(blogs[0]['id']).toBeDefined();
  } else {
    const newBlogObject = new Blog({ title: "Test blog", author: "Test author", url: "Test url", likes: 10 })
    await newBlogObject.save()

    blogs = await Blog.find({})
    expect(blogs[0]['id']).toBeDefined();
  }

})

test('save a blog to the database', async () => {
  const blogs = await Blog.find({})

  const blog = new Blog({ title: "Test blog", author: "Test author", url: "Test url", likes: 5 })
  await blog.save()

  const newBlogs = await Blog.find({})
  const titles = newBlogs.map(b => b.title);

  expect(blogs.length + 1).toBe(newBlogs.length);
  expect(titles).toContain("Test blog");
})

test('check the default value of likes', async () => {

  const blog = new Blog({ title: "Test blog", author: "Test author", url: "Test url" })
  await blog.save()

  expect(blog.likes).toBe(0);

})

test('check the existence of title and url properties', async () => {
  await api
    .post('/api/blogs')
    .send({ author: "Test author", likes: 20 })
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
