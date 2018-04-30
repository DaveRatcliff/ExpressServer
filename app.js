const dotenv = require('dotenv')
dotenv.config()
const axios = require('axios')
const express = require('express')
const handlebars = require('handlebars')
const exphbs  = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3000
const db = require('./db.js')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.json())

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next)
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

/* HTML */

app.get(['/', '/posts'], asyncMiddleware( async (req, res, next) => { 
  const posts = await getPosts()
  return res.render('home', { posts })
}))

app.get('/posts/:id', asyncMiddleware( async (req, res, next) => { 
  const id = req.params.id
  const post = await getPost(id)
  return res.render('post', { post })
}))

/* API */

app.post('/api/posts', asyncMiddleware( async (req, res, next) => {
  const data = req.body
  const post = await createPost(data)
  return res.json(post)
}))

app.get('/api/posts', asyncMiddleware( async (req, res, next) => { 
  const posts = await getPosts()
  return res.json(posts)
}))

app.get('/api/posts/:id', asyncMiddleware( async (req, res, next) => {
  const id = req.params.id 
  const post = await getPost(id)
  return res.json(post)
}))

/* Services */

async function createPost (data) {
  const post = await db.Post.create(data)
  return post
}

async function getPosts() {
  try {
    //const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    //return response.data
    const posts = await db.Post.findAll()
    return posts
  } catch (error) {
    console.error(error)
  }
}

async function getPost(id) {
  try {
    //const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?id=${id}`)
    //return response.data
    return await db.Post.findById(id)
  } catch (error) {
    console.error(error)
  }
}
