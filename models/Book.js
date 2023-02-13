const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {};


Book.init ( 
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isbn: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pages: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reader_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'book',
  }
);

module.exports = Book;