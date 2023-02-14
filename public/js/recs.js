
const newFormHandler = async (event) => {
    event.preventDefault();
    const searchTerm = document.querySelector('#search-input').value.trim();
    console.log(searchTerm);
    // var searchButton = document.getElementById('search-button');
    // var booksContainer = document.getElementById('books-container');
   console.log("Hello!");

        const response = await fetch(`/recs?bookname=${searchTerm}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      console.log(response);
   
      
    };

    document
    .querySelector('#search-button')
    .addEventListener('click', newFormHandler);
  


















    // function getButton(event) {
    //     searchTerm = event.target.id;
    //     console.log(searchTerm);
    //     // searchButtonContainer.classList = "hide  "
    //     // call book query function based on searched book
    //     getApi(searchTerm);
    //   };


    // API call for certain book titles
//     function getApi() {
//         var requestUrl = `https://www.googleapis.com/books/v1/volumes?q=HarryPotter&maxResults=6&key=AIzaSyD7Dwq_e3cP_InmvZFjC5IJcefiw-bXM8s`;
//         fetch(requestUrl)
//             .then(function (response) {
//                 return response.json();
//             })
//             .then(function (data) {
//                 // LOOPING THRU TO GET TITLE, AUTHOR, DESCRIPTION, PIC
//                 for (var i = 0; i < data.length; i++) {
//                     var bookName = bookData.data.items[i].volumeInfo.title;
//                     var bookAuthor = bookData.data.items[i].volumeInfo.authors;
//                     var bookDescription = bookData.data.items[i].volumeInfo.description;
//                     var bookPic = bookData.data.items[i].volumeInfo.imageLinks.smallThumbnail;
//                     console.log(bookName);
//                     console.log(bookAuthor);

//                     // Creating list of Book results
//                     bookName = document.createElement('h3');
//                     bookName.id = bookData.data.items[i];
//                     bookAuthor = document.createElement('p');
//                     bookDescription = document.createElement('p');
//                     bookName.textContent = bookName;
//                     bookAuthor.textContent = bookAuthor;
//                     bookDescription.textContent = bookDescription; 

//                     // Appending created elements 
//                     booksContainer.append(bookName);
//                     booksContainer.append(bookAuthor);
//                     booksContainer.append(bookDescription);
//                     bookName.setAttribute("bookName", bookName.textContent);
//                     bookName.setAttribute("bookAuthor", bookAuthor.textContent);
//                     bookName.setAttribute("bookDescription", bookDescription);

//                 }








//             }

//             )};

// };














