const router = require('express').Router();
const { Book } = require('../../models');
const axios = require('axios')
const withAuth = require('../../utils/auth');


// to create a new book to the database
router.post('/', async (req, res) => {
    try {
      const newBook = await Book.create({
        ...req.body,
        // reader_id: req.session.user_id,
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




// Harrisons api fetch work 
router.get('/', async (req, res) => {
    const bookURL = 'https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyD7Dwq_e3cP_InmvZFjC5IJcefiw-bXM8s'
    
    // try{
    const bookData = await axios.get(bookURL
    //     method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    );
    console.log(bookData.data.items[0].volumeInfo.title)
    return res.send(bookData.data)
    // }
    // catch (err) {
    //     res.status(500).json("WRONG")
    // }
});




module.exports = router
      