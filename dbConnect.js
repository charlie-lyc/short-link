const { Sequelize, DataTypes } = require('sequelize')

// const sequelize = new Sequelize('short_links', 'root', 'charlie-lyc', {
//     host: 'localhost',
//     dialect: 'mysql'
// })

const sequelize = new Sequelize('heroku_b141622d14a431f', 'b33516efdb3023', 'ef3135fb', {
    host: 'us-cdbr-east-04.cleardb.com',
    dialect: 'mysql'
})

module.exports = sequelize