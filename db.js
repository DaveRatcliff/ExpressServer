const Sequelize = require("sequelize");
const DATABASE_URL = process.env.DATABASE_URL;

const sequelizeOptions = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    }
});

const Post = sequelizeOptions.define('post', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports = {
    sequelizeOptions,
    post
}