const router = require('express').Router();
const { Book } = require('../../models');
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