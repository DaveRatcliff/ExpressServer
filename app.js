const axios = require('axios')
const express = require('express')
const handlebars = require('handlebars')
const handlebarExpress = require("handlebar-express")
const app = express()

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
};

app.get('/posts', asyncMiddleware( (req, res) => { 
  const posts = await getPosts()
  return res.send(posts)
}))


app.get( 'api/posts/:id', asyncMiddleware( (req, res) => { 
  const posts = await getPosts()
  const postID = req.params.id
  return res.send(posts.postID)
}))

app.listen(3000, () => console.log('Listening on port 3000!'))

async function getPosts() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return response
  } catch (error) {
    console.error(error)
  }
}

async function getPost(id) {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return response
  } catch (error) {
    console.error(error)
  }
}
