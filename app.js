const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('test'))

app.listen("http://127.0.0.1/posts", () => console.log('Should point to URL'))