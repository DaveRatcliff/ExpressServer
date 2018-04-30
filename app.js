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
cors = require('cors')

/*
Goal:
1. Update API to receive a completed game
X Create a DB model to hold a game
X Create API endpoint to store a game
X Create API endpoint to list games
X Create API endpoint to list a single game
X Test with Postman

2. Update API "Admin" to show list of games and game detail

3. Update UI to send completed games to the API
X Have a variable hold game state
X Send to API when game finishes
*/

app.use(cors())
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

app.get(['/', '/games'], asyncMiddleware( async (req, res, next) => { 
  const games = await getGames()
  return res.render('home', { games })
}))

app.get('/games/:id', asyncMiddleware( async (req, res, next) => { 
  const id = req.params.id
  const game = await getGame(id)
  return res.render('game', { game })
}))

/* API */

app.post('/api/games', asyncMiddleware( async (req, res, next) => {
  const { moves } = req.body // { moves: ['x','o', ...]}
  const game = await createGame({ moves })
  return res.json(game)
}))

app.get('/api/games/:id', asyncMiddleware( async (req, res, next) => {
  const id = req.params.id 
  const game = await getGame(id)
  return res.json(game)
}))

app.get('/api/games', asyncMiddleware( async (req, res, next) => { 
  const games = await getGames()
  return res.json(games)
}))

/* Services */

async function createGame ({ moves }) {
  // TODO -- Validate moves
  const game = await db.Game.create({ moves })
  return game
}

async function getGames() {
  try {
    const games = await db.Game.findAll()
    return games
  } catch (error) {
    console.error(error)
  }
}

async function getGame(id) {
  try {
    return await db.Game.findById(id)
  } catch (error) {
    console.error(error)
  }
}
