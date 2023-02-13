document.querySelectorAll('.save-button').addEventListener('click', (event)=>{
    event.preventDefault();
    const index = event.target.getAttribute('book-index').value;
    // calls 
    // /api/books/index
})