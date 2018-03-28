const axios = require('axios')
const express = require('express')
const mustache = require('mustache')
const app = express()


app.get('/posts', (req, res) => { 
  // Research how to use async/await with Express
  // TODO -- await the array of posts (or error) from getPost
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1')
  res.send(req.query.original)
  router.get('https://jsonplaceholder.typicode.com/posts', async (req, res, next) => {
    try {
      getPost()
    } catch (error) {
      console.log(error) 
    }
  })
  res.send('Hello!') 
  // TODO -- Use an HTML templating engine to feed in the list of posts and do the basic formatting
})

app.listen(3000, () => console.log('Listening on port 3000!'))

async function getPost() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    console.log(response)
  } catch (error) {
    console.error(error)
  }
  // TODO -- Return result as an array or error
  try{


  } catch (error) {
      console.error(error)
  }
}
