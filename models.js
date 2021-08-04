const { DataTypes } = require('sequelize')
const sequelize = require('./dbConnect')

const Link = sequelize.define('Link', {
        shortId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: 'shortId',
                msg: 'Try again!'
            }
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: {
            //     args: 'url',
            //     msg: 'URL is already taken!'
            // }
        }, 
        aliasName: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: {
                args: 'url',
                msg: 'URL is already taken!'
            }
        }
    },
    {
        sequelize,
        modelName: 'Link',
        tableName: 'links',
        timestamps: true
    }
)


module.exports = { Link }