// document.querySelectorAll('.save-button').addEventListener('click', (event) => {
//     event.preventDefault();
//     const index = event.target.getAttribute('book-index').value;
//     // calls 
//     // /api/books/index
// })


document.querySelector('.submit-button').addEventListener('click', (event) => {
    event.preventDefault();
    var searchTerm = document.querySelector('#searchTerm').value;
    var searchSelector = document.querySelector('#searchSelector').value;
    document.location.replace(`/api/books/booksearch/${searchTerm}`)
    });



