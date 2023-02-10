const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const booksRoutes = require('./booksRoutes');

router.use('/users', userRoutes);
// router.use('/books', booksRoutes);

module.exports = router;
