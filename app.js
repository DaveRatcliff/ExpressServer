const axios = require('axios')
const express = require('express')
const handlebars = require('handlebars')
const expressHandlebars = require("express-handlebars")
const app = express()

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
};

app.listen(3000, () => console.log('Listening on port 3000!'))

app.get('/posts', asyncMiddleware( async (req, res, next) => { 
  const posts = await getPosts()
  return res.send({posts})
}))

app.get('posts/:id', asyncMiddleware( async (req, res, next) => { 
  const postID = req.params.id
  const post = await getPost(postID)
  return res.send({post})
}))

app.get('api/posts', asyncMiddleware( async (req, res, next) => { 
  const posts = await getPosts()
  return res.JSON(posts)
}))

//res.render?

async function getPosts() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return response.data
  } catch (error) {
    console.error(error)
  }
}

async function getPost(id) {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
