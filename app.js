const express = require('express')
const app = express()

app.get('http://127.0.0.1/posts', (req, res) => res.send())

async function getPost() {
    try {
      const response = await axios.get(' https://jsonplaceholder.typicode.com/posts');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  //API probably needs to feed into an array?
  //list is populated by a for loop that cycles through the array?