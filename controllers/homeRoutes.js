const router = require('express').Router();
const { User, Book } = require('../models');
const axios = require('axios')
const withAuth = require('../utils/auth');


// to get all saved books, mylib page
router.get('/', async (req, res) => {
    try {
        const bookData = await Book.findAll({
            include: [User],
        });

        const books = bookData.map((book) => book.get({ plain: true }));

        res.render('homepage', { 
            books, 
            logged_in: req.session.logged_in 
          });
        // res.status(200).json(books);
    } catch (err) {
        res.status(500).json(err);
    }
});



// to find a book based off of its ID, when soneone clicks on the book in their lib
router.get('/books/:id', async (req, res) => {
    try {
        const bookData = await Book.findOne({
            where: {
                id: req.params.id
            },
            include: [User],
        });
      
        const book = bookData.get({ plain: true });

        // res.render('singleBook', {
        //     ...book
        //     // logged_in: req.session.logged_in
        //   });

        res.status(200).json(book);
    } catch (err) {
        res.status(500).json(err);
    }
});

// to get to the book recs page
router.get('/recommendations',  (req, res) => {

  res.render('recommendations');
});



// to get to the book search page 
router.get('/search',  (req, res) => {

  res.render('search');
});






// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Book }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('homepage', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });





router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

module.exports = router