const User = require('./User');
const Book = require('./Book');

User.hasMany(Book, {
  foreignKey: 'reader_id',
  onDelete: 'CASCADE'
});

Book.belongsTo(User, {
  foreignKey: 'reader_id'
});



module.exports = { User, Book };