const deleteHandler = async (event) => {
    event.preventDefault();
    const bID = event.target.getAttribute('bID')
    console.log(bID);
    const response = await fetch(`/api/books/${bID}`, {
        method: 'DELETE',

    });
    if (response.ok) {
        console.log("OK!");
        document.location.replace('/library');
      } else {
        console.log("ERROR!");
        alert('Failed to delete project');
      }
};

document.querySelectorAll('.delete-button').forEach(elem => elem?.addEventListener('click', deleteHandler));
