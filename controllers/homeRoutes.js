const router = require('express').Router();
const { User, Book } = require('../models');
const axios = require('axios')
const withAuth = require('../utils/auth');
var searchedBooks = [];

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






// to get to the book search page 
router.get('/search', withAuth,  (req, res) => {

  res.render('search', {logged_in: true});
});


// to get to the library page 
router.get('/library', (req, res) => {
  const bookToSave = req.session.books[index]

  res.render('library', bookToSave);
});



// Use withAuth middleware to prevent access to route
router.get('/profile', async (req, res) => {
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



  router.get('/booksearch/:searchTerm', withAuth, async (req, res) => {
  
    // var titleSearch = 'mistborn'
    // var authorSearch = 'Brandon sanderson';
    // authorSearch = authorSearch.split(" ").join('%20')
    // var genreSearch;
    // var searchSelector = 'title';
    // var searchTerm
  
  
    // if (searchSelector == 'genre') {
    //   searchTerm = genreSearch
    // } else if (searchSelector == 'author') {
    //   searchTerm = 'inauthor:' + authorSearch;
    // } else if (searchSelector == 'title') {
    //   searchTerm = titleSearch;
    // }
    const bookURL = `https://www.googleapis.com/books/v1/volumes?q=${req.params.searchTerm}&maxResults=6&key=AIzaSyD7Dwq_e3cP_InmvZFjC5IJcefiw-bXM8s`
    bookList = []
    const bookData = await axios.get(bookURL, {
      params: {
        per_page: 3
      }
    });
  
    // console.log(bookURL)
    // console.log(bookData.data.items[0])
    const bookCount = Math.min(bookData.data.items.length, 5);
    for (let i = 0; i < bookCount; i++) {
      bookList.push({
        title: bookData.data.items[i].volumeInfo.title,
        description: bookData.data.items[i].volumeInfo.description,
        authors: bookData.data.items[i].volumeInfo.authors,
        pages: bookData.data.items[i].volumeInfo.pageCount,
        thumbnail: bookData.data.items[i].volumeInfo.imageLinks.smallThumbnail,
        id: bookData.data.items[i].id
      });
    };
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.books = [];
  
  
      // for (let i = 0; i < bookCount; i++) {
      //   bookList.push(bookData.data.items[i]);
      // };
    });
  
    res.redirect('/results')
    // res.render('search', { bookList })
    // return res.send(bookList)
    // return res.send(bookData.data.items)
  });
  

  //localStorage.setItem("bookList", JSON.stringify(bookList));

  
  router.get('/results', withAuth, async (req, res)=> {
    res.render('search', {bookList, logged_in: true})
  })
  
 router.get('/library', withAuth, async (req, res) => {
  const userData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] },
    include: [{ model: Book }],
  });

    res.render('library', {
      books: userData.books,
      logged_in: true
    })
 })


 router.get('/recommendation/:searchTerm', withAuth, async(req,res)=>{


  const searchTerm = req.params.searchTerm;


  searchedBooks = [];


  const bookURL = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=2&key=AIzaSyD7Dwq_e3cP_InmvZFjC5IJcefiw-bXM8s`
      const bookData = await axios.get(bookURL);
      console.log(bookURL)
  console.log(bookData.data.items[0])
  const bookCount = Math.min(bookData.data.items.length, 5);
  for (let i = 0; i < bookCount; i++) {
    searchedBooks.push({
      title: bookData.data.items[i].volumeInfo.title,
      description: bookData.data.items[i].volumeInfo.description,
      authors: bookData.data.items[i].volumeInfo.authors,
      thumbnail: bookData.data.items[i].volumeInfo.imageLinks.smallThumbnail,
      id: i
    });
  };
  req.session.save(() => {
    req.session.bookData = bookData.data;
    req.session.logged_in = true;
    req.session.books = [];




    // for (let i = 0; i < bookCount; i++) {
    //   bookList.push(bookData.data.items[i]);
    // };
  });


  res.redirect('/recommendations');
});
// to get to the book recs page
router.get('/recommendations', (req, res) => {


  res.render('recommendations', {bookList:searchedBooks});
});








 

module.exports = router