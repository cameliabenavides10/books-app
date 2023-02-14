


const newFormHandler = async (event) => {
    event.preventDefault();
    const search = document.querySelector('#book-info').value.trim();
    const response = await fetch(`recs/:query`, {
        method: 'POST',
        body: JSON.stringify({ search }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
};
    document
    .querySelector('#save-button')
    .addEventListener('click', newFormHandler);