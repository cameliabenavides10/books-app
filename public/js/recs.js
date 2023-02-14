const newFormHandler = async (event) => {
    event.preventDefault();
    const searchTerm = document.querySelector('#search-input').value.trim();
    if(!searchTerm) {
        alert('Input a GOD DANG GENRE');
        return;
    }
    document.location.replace(`/recommendation/${searchTerm}`);
    };

document
    .querySelector('#search-button')
    .addEventListener('click', newFormHandler);
  

