const router = require('express').Router();
const { Book } = require('../../models');
const axios = require('axios')
const withAuth = require('../../utils/auth');
// var authorSearch = document.querySelector('#authorSearch').value;
var titleSearch = 'mistborn'
var authorSearch = 'Brandon sanderson';
authorSearch = authorSearch.split(" ").join('%20')
var genreSearch;
var searchSelector = 'author'
// var genreSearch = document.querySelector('#genreSearch').value;
// var titleSearch = document.querySelector('#titleSearch').value;

// to create a new book to the database
//post('/:index');

router.post('/:index', withAuth, async (req, res) => {
  try {

    const bookToSave = req.session.books[req.params.index];
    const savedBook = await Book.create({
      ...bookToSave,
      // reader_id: req.session.user_id,
    });
    res.status(200).json(savedBook);
  } catch (err) {
    res.status(400).json(err);
  }
});



// const bookToSave = req.session.books[index]
// bookToSave would be the body of post request
router.post('/', withAuth, async (req, res) => {
    try {
      const newBook = await Book.create({
        ...req.body,
        reader_id: req.session.user_id,
      });
      res.status(200).json(newBook);
    } catch (err) {
      res.status(400).json(err);
    }
  });


// to delete a certain book by id
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const bookData = await Book.destroy({
        where: {
          id: req.params.id
        //   reader_id: req.session.user_id,
        }
      });
      if (!bookData) {
        res.status(404).json({ message: 'No book found with this id!' });
        return;
      }
      res.status(200).json(bookData);
    } catch (err) {
      res.status(500).json(err);
    }
  });





  

 












module.exports = router
      
