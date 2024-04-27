function redirectToAddPage() {
    // Replace 'page.html' with the URL of the page you want to redirect to
    window.location.href = 'add-movie.html';
}
function redirectToDeletePage() {
    // Replace 'page.html' with the URL of the page you want to redirect to
    window.location.href = 'delete-movie.html';
}

async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/data')
        const data = await response.json();

        const textDataElement = document.getElementById('textData')
        textDataElement.textContent = JSON.stringify(data, null, 2);
    }
    catch(error){   
        console.error('error fetching data', error)
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    fetchData();
    const AddmovieForm = document.getElementById('AddMovieForm');

    AddmovieForm.addEventListener('submit', function(event) {
        console.log('add form submitted');
        event.preventDefault();  // Prevent default form submission
        
        const movieTitle = document.getElementById('movieTitle').value;
        const releaseYear = document.getElementById('releaseYear').value;
        const language = document.getElementById('language').value;

        const data = {
            movieTitle,
            releaseYear,
            language
        };

        fetch('http://localhost:3000/post', {         //fetch is the js method used to communicate with the backend by making HTTP requests
            method: 'POST',                           //fetch('url', 'options') options: describe the nature of the request being sent 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Data sent to backend:', data);
            alert('Movie added successfully');
        })
        .catch(error => {
            console.error('Error sending data to backend:', error);
            alert('Failed to add movie. Please try again.');
        });
    });

    //delete operation

    const DeleteMovieForm = document.getElementById('DeleteMovieForm1')
    console.log(document.getElementById('DeleteMovieForm'));
    DeleteMovieForm.addEventListener('submit', function(event){
        console.log('delete form submitted');
        event.preventDefault();
        
        const movieTitle = document.getElementById('movieTitle').value;
        const releaseYear = document.getElementById('releaseYear').value;
        const language = document.getElementById('language').value;
    
        const deleteData = {
            title : movieTitle,
            year : releaseYear,
            language : language
        }
    
        console.log(deleteData)
    
        fetch('http://localhost:3000/delete', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(deleteData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('data send to backend', data)
            alert('movie deleted successfully')
        })
    
        .catch(error => {
            console.log('error sending delete data to backend', error)
            alert('failed to delete movie. Please try again')
        })
    })

});

