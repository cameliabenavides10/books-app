function handleFormSubmit() {
    var authorSearch = document.querySelector('#authorSearch').value;
    var genreSearch = document.querySelector('#genreSearch').value;
    var titleSearch = document.querySelector('#titleSearch').value;
    console.log(authorSearch);
    console.log(genreSearch);
    console.log(titleSearch);
    if(authorSearch) {
        getBooks(authorSearch);
    } else if (genreSearch) {
        getBooks(genreSearch);
    } else if(titleSearch) {
        getBooks(titleSearch);
    }
};

const getBooks = async () => {
    const bookURL = 'url'
    try{
    const bookData = await fetch(bookURL, {
        method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      
    });
    return response.status(200).json(bookData)
    }
    catch (err) {
        res.status(500).json(err)
    }
};


