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

// to get to the book recs page
router.get('/recommendations', (req, res) => {

  res.render('recommendations');
});



// to get to the book search page 
router.get('/booksearch', (req, res) => {

  res.render('search');
});


// to get to the library page 
router.get('/library', (req, res) => {
  const bookToSave = req.session.books[index]

  res.render('library', bookToSave);
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





router.get('/recs', async (req, res) => {

  // var searchTerm = req.params.bookName;
  // console.log(searchTerm);
  let searchTerm = req.query.bookname;
  console.log(req.query);
  console.log(searchTerm);



  //     searchedBooks = [];
  //     const bookURL = 'https://www.googleapis.com/books/v1/volumes?q='+searchTerm+'&maxResults=2&key=AIzaSyD7Dwq_e3cP_InmvZFjC5IJcefiw-bXM8s'

  //     const bookData = await axios.get(bookURL);

  //     console.log(bookURL)
  //     console.log(bookData.data.items[0].volumeInfo.title)



  //     bookData.data.items.forEach((item) => {
  //     searchedBooks.push( 
  // {
  //   title : item.title,
  //   author : item.authors,
  //   description : item.description,
  //   // thumbmail : item.imageLinks.smallThumbnail
  // }
  // )
  // });
  // console.log(bookData.data.items);
  //     console.log(searchedBooks);
  // res.render("homepage");

let bookArray=[ 
  {
      "title": "Sal",
      "author": "pizza",
      "isbn": "8525",
      "pages": "200" 
    },
    {
        "title": "the alchemist",
        "author": "paolo soemthing",
        "isbn": "789",
        "pages": "500" 
      },
      {
        "title": "harry potter",
        "author": "jk rowling",
        "isbn": "123",
        "pages": "900" 
      }
  ];


  res.render('recResults', bookArray);

  //  res.render('recResults', searchedBooks);
});
















//   router.post('/recs', async (req, res) => {

//     var searchTerm = req.body.searchTerm;
//     // console.log(searchTerm);




//     searchedBooks = [];
//     const bookURL = 'https://www.googleapis.com/books/v1/volumes?q='+searchTerm+'&maxResults=2&key=AIzaSyD7Dwq_e3cP_InmvZFjC5IJcefiw-bXM8s'

//     const bookData = await axios.get(bookURL);

//     console.log(bookURL)
//     console.log(bookData.data.items[0].volumeInfo.title)



//     bookData.data.items.forEach((item) => {
//     searchedBooks.push( 
// {
//   title : item.title,
//   author : item.authors,
//   description : item.description,
//   // thumbmail : item.imageLinks.smallThumbnail
// }
// )
// });
// console.log(bookData.data.items);
//     console.log(searchedBooks);
//     res.redirect('/');

//     //  res.render('recResults', searchedBooks);
//     });


// router.get('/recResults', async (req, res) => {
//   console.log()

// })









module.exports = router