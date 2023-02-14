// document.querySelectorAll('.save-button').addEventListener('click', (event) => {
//     event.preventDefault();
//     const index = event.target.getAttribute('book-index').value;
//     // calls 
//     // /api/books/index
// })


document.querySelector('.submit-button').addEventListener('click', (event) => {
    event.preventDefault();
    var searchTerm = document.querySelector('#searchTerm').value;
    console.log(searchTerm)
    // var searchSelector = document.querySelector('#searchSelector').value;
    document.location.replace(`/booksearch/${searchTerm}`)
});


const newFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value
    // const search = document.querySelector('#book-info').value.trim();
    const response = await fetch(`/api/books`, {
        method: 'POST',
        body: ({ title }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        document.location.replace('/results');
      } else {
        alert('Failed to create project');
      }
};
document
    .querySelector('#save-button')
    .addEventListener('click', newFormHandler);