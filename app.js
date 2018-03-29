const axios = require('axios')
const express = require('express')
const handlebars = require('handlebars')
const exphbs  = require('express-handlebars');
const app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
};

app.listen(3000, () => console.log('Listening on port 3000!'))

app.get('/posts', asyncMiddleware( async (req, res, next) => { 
  const posts = await getPosts()
  console.log("got it")
  return res.render('home', {posts: posts})
}))

app.get('/posts/:id', asyncMiddleware( async (req, res, next) => { 
  const id = req.params.id
  const post = await getPost(id)
  return res.render('post', { post: post[0] })
}))

app.get('/api/posts', asyncMiddleware( async (req, res, next) => { 
  const posts = await getPosts()
  console.log("got it")
  return res.json(posts)
}))


async function getPosts() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return response.data
  } catch (error) {
    console.log("somethings wrong")
  }
}

async function getPost(id) {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?id=${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
