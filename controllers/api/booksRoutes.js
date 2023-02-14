const router = require('express').Router();
const { Book } = require('../../models');
const axios = require('axios')
const withAuth = require('../../utils/auth');

var bookList = []

// to create a new book to the database
//post('/:index');

router.post('/:index', withAuth, async (req, res) => {
  try {

    const bookToSave = bookList[req.params.index];
    console.log(bookList[req.params.index])
    const savedBook = await Book.create({
      title: bookList[req.params.index].volumeInfo.title,
      reader_id: req.session.user_id,
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







// router.get('/booksearch/:searchTerm', withAuth, async (req, res) => {
  
//   // var titleSearch = 'mistborn'
//   // var authorSearch = 'Brandon sanderson';
//   // authorSearch = authorSearch.split(" ").join('%20')
//   // var genreSearch;
//   // var searchSelector = 'title';
//   // var searchTerm


//   // if (searchSelector == 'genre') {
//   //   searchTerm = genreSearch
//   // } else if (searchSelector == 'author') {
//   //   searchTerm = 'inauthor:' + authorSearch;
//   // } else if (searchSelector == 'title') {
//   //   searchTerm = titleSearch;
//   // }
//   const bookURL = `https://www.googleapis.com/books/v1/volumes?q=${req.params.searchTerm}&maxResults=6&key=AIzaSyD7Dwq_e3cP_InmvZFjC5IJcefiw-bXM8s`
//   bookList = []
//   const bookData = await axios.get(bookURL, {
//     params: {
//       per_page: 3
//     }
//   });

//   console.log(bookURL)
//   console.log(bookData.data.items[0])
//   const bookCount = Math.min(bookData.data.items.length, 5);
//   for (let i = 0; i < bookCount; i++) {
//     bookList.push({
//       title: bookData.data.items[i].volumeInfo.title,
//       description: bookData.data.items[i].volumeInfo.description,
//       authors: bookData.data.items[i].volumeInfo.authors,
//       thumbnail: bookData.data.items[i].volumeInfo.imageLinks.smallThumbnail
//     });
//   };
//   req.session.save(() => {
//     req.session.bookData = bookData.data;
//     req.session.logged_in = true;
//     req.session.books = [];


//     // for (let i = 0; i < bookCount; i++) {
//     //   bookList.push(bookData.data.items[i]);
//     // };
//   });

//   res.redirect('/api/books/results')
//   // res.render('search', { bookList })
//   // return res.send(bookList)
//   // return res.send(bookData.data.items)
// });


// router.get('/results', async (req, res)=> {
//   res.render('search', {bookList})
// })

module.exports = router

