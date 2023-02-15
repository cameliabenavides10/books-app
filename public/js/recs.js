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
  
    const saveHandler2 = async (event) => {
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
            document.location.replace('/library');
        } else {
            console.log("ERROR!");
            alert('Failed to create project');
        }
    };
    
    
    
    document.querySelectorAll('.save-button').forEach(elem => elem?.addEventListener('click', saveHandler2));
    