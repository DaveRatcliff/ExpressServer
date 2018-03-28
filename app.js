const express = require('express')
const app = express()

app.get('http://127.0.0.1/posts', (req, res) => res.send())

axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  //API probably needs to feed into an array?
  //list is populated by a for loop that cycles through the array?