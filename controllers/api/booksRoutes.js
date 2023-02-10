const router = require('express').Router();
const { Book } = require('../../models');
<<<<<<< HEAD
const withAuth = require('../../utils/auth');


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

  module.exports = router;
=======
const axios = require('axios')




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
>>>>>>> 3d4cae87cdbb25f20f02c6d4083794b3518d1954
