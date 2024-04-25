document.addEventListener('DOMContentLoaded', fetchData);

function redirectToPage() {
    // Replace 'page.html' with the URL of the page you want to redirect to
    window.location.href = 'add-movie.html';
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
    const movieForm = document.getElementById('movieForm');

    movieForm.addEventListener('submit', function(event) {
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
});

