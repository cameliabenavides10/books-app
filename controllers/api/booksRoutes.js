const router = require('express').Router();
const { Book } = require('../../models');
const axios = require('axios')
const withAuth = require('../../utils/auth');

var bookList = []

// to create a new book to the database
//post('/:index');

router.post('/save', withAuth, async (req, res) => {
  try {
    console.log("BOOK ROUTE!");

    const bookId = req.body.bookId;
    console.log(bookId);

    const bookURL = `https://www.googleapis.com/books/v1/volumes/${bookId}?q=maxResults=1&key=AIzaSyD7Dwq_e3cP_InmvZFjC5IJcefiw-bXM8s`
    bookList = []
    const bookToSave = await axios.get(bookURL, {
      params: {
        per_page: 3
      }
    });

    console.log("LINE 26 POTATO CHIPS", bookToSave);

    const savedBook = await Book.create({
      title: bookToSave.data.volumeInfo.title,
      author: bookToSave.data.volumeInfo.authors[0],
      isbn: bookToSave.data.volumeInfo.industryIdentifiers[1].identifier,
      thumbnail: bookToSave.data.volumeInfo.imageLinks.smallThumbnail,
      pages: bookToSave.data.volumeInfo.pageCount,
      reader_id: req.session.user_id,
    });

    console.log("AFTER THE THINGY")
    res.status(200).json(savedBook);
  } catch (err) {
    console.error("WE GOT AN ERROR!");
    console.error(err);
    res.status(400).json(err);
  }
});



// const bookToSave = req.session.books[index]
// bookToSave would be the body of post request
router.post('/', withAuth, async (req, res) => {
  try {
    console.log(req.body.book);
    const newBook = await Book.create({
      ...req.body.book,
      reader_id: req.session.user_id,
    });
    res.status(200).json(newBook);
  } catch (err) {
    res.status(400).json(err);
  }
});


// to delete a certain book by id
router.delete('/:id', async (req, res) => {
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

