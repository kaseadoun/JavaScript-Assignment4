// SELECTORS AND VARIABLES
// Student info query selectors
const studentInfoContainer = document.querySelector("#student-info-container");
const studentInfoButton = document.querySelector("#student-info-button");
// Search query selectors
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const searchMessage = document.querySelector("#search-message");
// Movie query selectors
const movieContainer = document.querySelector("#movie-container");
// API variables
let searchValue;
let movieUrl = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${searchValue}?exact=false&titleType=movie`
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '47a951f6dfmsh5d5f1e25322619dp11924cjsnf5dbbc6724c5',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
};
// Array for movies
let movieData = [];

// FUNCTIONS AND EVENT LISTENERS
// Event listener to search for the movie in the search input
searchButton.addEventListener('click', () => {
    // Takes text value from the search input
    searchValue = searchInput.value;
    // Replaces all spaces with the appropriate code to put into the URL
    searchValue = searchValue.replaceAll(' ', '%20');
    // Resets outcome message
    searchMessage.textContent = '';
    // Places the search into the URL
    movieUrl = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${searchValue}?exact=false&titleType=movie`;
    // Tries to request for data with the URL and API Key
    try {
        fetch(movieUrl, options).then((response) => {
            return response.json();
        }).then((data) => { // Calls for creating movie info cards with the data
            searchMessage.textContent = `Search returned ${data["entries"]} entries.`;
            arrayMovieData(data);
            createMovieCards(movieData);
        })
    } catch (error) { // If fails, returns a message that API is not found.
        console.error(error);
        searchMessage.textContent = 'The application cannot find the API. Please come back and try again later.';
    }
})

// Event listener with the function to remove / display student information
studentInfoButton.addEventListener('click', () => {
    // Query selector here to check the student info paragraph is in the document
    const studentInfoParagraph = document.querySelector("#student-info-paragraph");
    // Create p element, and add id and text content
    const studentInfo = document.createElement('p');
    studentInfo.id = "student-info-paragraph";
    studentInfo.textContent = "Karsten Leung - 200547539";
    // Checks if student info is present, if so, remove it and break from the function
    if (studentInfoContainer.contains(studentInfoParagraph)) {
        studentInfoContainer.removeChild(studentInfoParagraph)
        return;
    }
    // If it doesn't contain it, append the student info
    studentInfoContainer.appendChild(studentInfo);
})

// Function to put the necessary movie data into an array
function arrayMovieData(data) {
    // Clears movieData array for new entry
    movieData = [];
    // If there are no entries, returns a message stating there are no entries and breaks
    if (data["entries"] == 0) {
        searchMessage.textContent = `No entries of ${searchInput.value} have been found.`;
        return;
    }
    // Makes an array of movies from the data object to limit use of data["results"]
    let moviesObjectArray = data["results"];

    // For loop to create movie information cards
    for (let i = 0; i < moviesObjectArray.length; i++) {
        // Set each index of the movie object to the variable movie for easy typing
        let movie = moviesObjectArray[i]
        // Pushes movie information object to the movieData array
        movieData.push({
            id: movie["id"],
            title: movie["titleText"]["text"],
            releaseDate: movie["releaseDate"] != null ? `${monthChange(movie["releaseDate"]["month"])} ${movie["releaseDate"]["month"]}, ${movie["releaseDate"]["year"]}` : `Unreleased`,
            imageUrl: movie["primaryImage"] == null ? "../img/null-poster.jpg" : movie["primaryImage"]["url"]
        });
    }
}

// Function to return the corresponding month to the numerical value equivalent
function monthChange(month) {
    // Sets a new month for every function call
    let monthString = '';
    // Switch statement to set the corresponding month
    switch (month) {
        case 1:
            monthString = 'January';
            break;
        case 2:
            monthString = 'February';
            break;
        case 3:
            monthString = 'March';
            break;
        case 4:
            monthString = 'April';
            break;
        case 5:
            monthString = 'May';
            break;
        case 6:
            monthString = 'June';
            break;
        case 7:
            monthString = 'July';
            break;
        case 8:
            monthString = 'August';
            break;
        case 9:
            monthString = 'September';
            break;
        case 10:
            monthString = 'October';
            break;
        case 11:
            monthString = 'November';
            break;
        case 12:
            monthString = 'December';
            break;
    }
    // Returns the month string
    return monthString;
}

// Function to create Movie Information Cards
function createMovieCards(movies) {
    // Resets the movie container, removes all movies when a new search is made
    movieContainer.textContent = '';
    // ForEach loop to iterate through the array, creating the movie card information
    movies.forEach((movie) => {
        // List of elements to create
        const parentCard = document.createElement('div');
        const textSection = document.createElement('div');
        const cardTitle = document.createElement('h3');
        const cardImageUrl = document.createElement('img');
        const cardReleaseDate = document.createElement('p');
        // Inserting text content and setting necessary attributes
        parentCard.classList.add("movieCard");
        cardTitle.textContent = movie["title"];
        cardImageUrl.setAttribute('src', movie["imageUrl"]);
        cardReleaseDate.textContent = `Release Date: ${movie['releaseDate']}`;
        // Append to parent (card)
        textSection.appendChild(cardTitle);
        textSection.appendChild(cardReleaseDate);
        parentCard.appendChild(cardImageUrl);
        parentCard.appendChild(textSection);
        // Append card to container
        movieContainer.appendChild(parentCard);
    })
}