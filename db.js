const Sequelize = require("sequelize");
const DATABASE_URL = process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    operatorsAliases: false,
    dialectOptions: {
        ssl: true
    }
});

const Post = sequelize.define('Post', {
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
    sequelize,
    Post
}