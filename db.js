const Sequelize = require("sequelize");
const DATABASE_URL = process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    operatorsAliases: false,
    dialectOptions: {
        ssl: true
    }
});

const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

function checkForWinner (moves, playerToCheck) {
    let hasWon = false

    WINNING_COMBOS.forEach(function (combo) {
      if (
        moves[combo[0]] === playerToCheck &&
        moves[combo[1]] === playerToCheck &&
        moves[combo[2]] === playerToCheck
      ) {
        hasWon = true
      }
    })

    return hasWon
}

const Game = sequelize.define('Game', {
    moves: {
        type: Sequelize.JSON,
        allowNull: false,
    },
    winner: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [['x', 'o', 'draw']],
        },
    },
})

Game.beforeValidate(game => {
    const { moves } = game
    // Must be a valid, 9-element array
    if (!Array.isArray(moves) || moves.length !== 9) {
        throw new Error('Moves must be a nine element array!')
    }

    // Must be X, O or null
    moves.forEach(m => {
        if (!['x', 'o', null].includes(m)) {
            throw new Error('Must be o, x or null')
        }
    })

    const totals = { x: 0, o: 0 }
    moves.forEach(m => {
        if (m !== null) {
            totals[m]++
        }
    })
    // - (X's >= 3 && O's >= 3)
    // - (X's - O's = 0 || 1)
    // - (X <=5 && O's <= 4)
    if(!(totals.x >= 3 && totals.o >= 3) || 
    !(totals.x - totals.o === 0 || totals.x - totals.o === 1) ||
    !(totals.x <= 5 && totals.o <= 4)) {
        throw new Error('Must be valid game board!')
    }

    // Only one winning solution
    const hasXWon = checkForWinner(moves, 'x')
    const hasYWon = checkForWinner(moves, 'o')
    const isADraw = moves.indexOf(null) === -1
    if (!hasXWon && !hasYWon && !isADraw) {
        throw new Error('The game does not have a winner or a draw!')
    }

    if (hasXWon && hasYWon) {
        throw new Error('The game cannot have two winners!')
    }

    // Set the winner
    if (hasXWon) {
        game.winner = 'x'
    } else if (hasYWon) {
        game.winner = 'o'
    } else if (isADraw) {
        game.winner = 'draw'
    }
})

sequelize.sync()

module.exports = {
    sequelize,
    Game,
}
