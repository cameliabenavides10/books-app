app.get('/results', (req,res)=>{
      res.render('resultpage', {books: req.session.books});  
});