
// const { Book } = require('../../models');

const newFormHandler = async (event) => {
    event.preventDefault();

    const save = document.querySelector('#save-button').value;
  
    if (save) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/books/', {
          method: 'POST',
          body: JSON.stringify({ data }),
          headers: { 'Content-Type': 'application/json' },
        });
    



        
        // if (response.ok) {
        //   // If successful, redirect the browser to the profile page
        //   document.location.replace('/profile');
        // } else {
        //   alert(response.statusText);
        // }
      }
    };