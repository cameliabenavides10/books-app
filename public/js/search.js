// document.querySelectorAll('.save-button').addEventListener('click', (event) => {
//     event.preventDefault();
//     const index = event.target.getAttribute('book-index').value;
//     // calls 
//     // /api/books/index
// })


document.querySelector('.submit-button').addEventListener('click', (event) => {
    event.preventDefault();
    var searchTerm = document.querySelector('#searchTerm').value;
    if (!searchTerm) {
        alert('Please input a search criteria!');
        return
    }
    console.log(searchTerm)
    // var searchSelector = document.querySelector('#searchSelector').value;
    document.location.replace(`/booksearch/${searchTerm}`)
});


const saveHandler = async (event) => {
    event.preventDefault();
    const bookId = event.target.getAttribute('book-id');
    console.log({ bookId });
    const response = await fetch(`/api/books/save`, {
        method: 'POST',
        body: JSON.stringify({ bookId }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        console.log("OK!");
        document.location.replace('/results');
    } else {
        console.log("ERROR!");
        alert('Failed to create project');
    }
};



document.querySelectorAll('.save-button').forEach(elem => elem?.addEventListener('click', saveHandler));

