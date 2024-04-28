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
    fetchData();
    console.log('DOM fully loaded and parsed');

    const addMovieForm = document.getElementById('AddMovieForm');
    const deleteMovieForm = document.getElementById('deleteMovieForm');

    console.log('Add Movie Form:', addMovieForm);
    console.log('Delete Movie Form:', deleteMovieForm);

    if (addMovieForm) {
        addMovieForm.addEventListener('submit', function(event) {
            console.log('Add form submitted');
            event.preventDefault();
            
            const movieTitle = document.getElementById('movie_Title').value;
            const releaseYear = document.getElementById('release_Year').value;
            const language = document.getElementById('language1').value;

            const data = {
                movieTitle,
                releaseYear,
                language
            };

            fetch('http://localhost:3000/post', {
                method: 'POST',
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
    }

    if (deleteMovieForm) {
        deleteMovieForm.addEventListener('submit', function(event) {
            console.log('Delete form submitted');
            event.preventDefault();
            
            const movieTitle = document.getElementById('movieTitle').value; // Ensure unique IDs
            const releaseYear = document.getElementById('releaseYear').value;
            const language = document.getElementById('language').value;

            const deleteData = {
                title: movieTitle,
                year: releaseYear,
                language: language
            };
            console.log(deleteData);

            fetch('http://localhost:3000/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(deleteData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Data sent to backend:', data);
                alert('Movie deleted successfully');
            })
            .catch(error => {
                console.error('Error sending delete data to backend:', error);
                alert('Failed to delete movie. Please try again.');
            });
        });
    }
});
