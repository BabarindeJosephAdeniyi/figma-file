/** @format */

let allMovies = [];

const result = document.getElementById("all-movies");

const searchBox = document.getElementById("search");
const filteredProduct = document.getElementById("filtered-movies");
const showError = document.getElementById("error");

let isPending = false;

document.addEventListener("DOMContentLoaded", function () {
  isPending = true;
  if (isPending === true) {
    document.querySelector("#all-movies").innerHTML = `
    <div class="text-center text-light fa-fade mt-5 pt-5">
          <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
          </div>
    </div>
    
`;
  }

  setTimeout(() => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=37a17723b6b6e51f3f20e84bc399269f",
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const movies = data.results;

        if (movies.length > 0) {
          const movie = movies[16];
          const posterUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;

          const movieInner = `
        <div class="d-flex w-100 rounded px-0 mt-4">
          <div class="movie-item w-100 bg-black w-100 text-justify  text  text-light">
            <h1 class="product-category ps-3 pt-4">${movie.original_title}</h1>
            <div class="overview">${movie.overview}</div>
            <div class="movie-category">  <img src="https://cdn.britannica.com/29/22529-004-ED1907BE/Union-Flag-Cross-St-Andrew-of-George.jpg" class=" category"width="5%">${movie.original_language}glish</div>
            <button class="ms-4 px-3 pt-1 border-0 watch rounded-pill">Watch</button>
            <img src="cards.png" class="category" width="10%" >
          </div>
          <div class="product-image" style="width: 100%;">
            <img src="${posterUrl}" height="350px" alt="${movie.title}" class="rounded-end" width="100%" style="object-fit: cover;">
          </div>
        </div>
          `;

          result.innerHTML = movieInner;
        } else {
          result.innerHTML = "No movies found.";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, 5000);

  return false;
});







    function getFavoritesFromLocalStorage() {
      const storedFavorites = localStorage.getItem("favoriteMovies");
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    }




document.addEventListener("DOMContentLoaded", function () {
  isPending = true;
  if (isPending === true) {
    document.getElementById("all-movies2").innerHTML = `
     <div class="text-center text-light fa-spin mt-5 pt-5">
          <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
          </div>
    </div>
  `;
  }
  setTimeout(() => {
    const allMoviesContainer = document.getElementById("all-movies2");
    const favorites = getFavoritesFromLocalStorage();

    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=37a17723b6b6e51f3f20e84bc399269f",
    )
      .then((response) => response.json())
      .then((data) => {
        const movies = data.results;
        allMovies = movies;
        displayMovies(movies);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    allMoviesContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("fa-heart")) {
        const movieIndex = event.target.getAttribute("data-movie-index");
        const movie = allMovies[parseInt(movieIndex)];

        const heartIcon = event.target;

        const isFavorite = favorites.some((fav) => fav.id === movie.id);

        if (!isFavorite) {
          favorites.push(movie);
          updateFavoritesUI();
          storeFavoritesInLocalStorage();
          heartIcon.classList.add("red-heart");
          alert("Video successfully added to favorites");
        } else {
          alert("This video is already in your favorites");
        }
      } else {
        const movieIndexToRemove = favorites.findIndex(
          (fav) => fav.id === movie.id,
        );
        if (movieIndexToRemove !== -1) {
          const heartIcon = event.target;
          favorites.splice(movieIndexToRemove, 1);
          updateFavoritesUI();
          storeFavoritesInLocalStorage();
          heartIcon.classList.remove("red-heart");
        }
      }
    });

    console.log("script.js is running");

    function displayMoviesDetail() {
      // Add code to display detailed movie information
    }

    // Function to update the UI when favorites are updated (if needed)
    function updateFavoritesUI() {
      // Add code to update the UI when favorites are updated (if needed)
    }

    // Function to store favorites in local storage
    function storeFavoritesInLocalStorage() {
      localStorage.setItem("favoriteMovies", JSON.stringify(favorites));
    }

    // Fetch top-rated movies
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=37a17723b6b6e51f3f20e84bc399269f",
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        allMovies = data.results;
        displayMovies(allMovies);
      });

    function displayMovies(movies) {
      const results = document.getElementById("all-movies2");
      if (results) {
        const movieInner = movies
          .map(
            (value, index) => `
      <div class="product-item">
        <div class="product-image">
          <img src="https://image.tmdb.org/t/p/original${
            value.poster_path
          }" class="rounded-pilll" width="30%" alt="${value.title}">
        </div>
        <div class="product-title">${value.title.substr(0, 25)}</div>
        <div class="product-description">${value.overview.substr(
          0,
          25,
        )}...</div>
        <span class="fav">Add to favorites <i class="fas fa-heart heart favorite" data-movie-index="${index}" tabindex="0"></i></span>
      </div>
     `,
          )
          .join("");
        results.innerHTML = movieInner;
      } else {
        console.error("Element with ID 'all-movies2' not found");
      }
    }
  }, 10000);

  return false;
});

function filteredProductList(searchValue) {
  return allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchValue.toLowerCase()),
  );
}

searchBox.addEventListener("input", (e) => {
  const searchValue = e.target.value;
  const filteredArray = filteredProductList(searchValue);
  filteredProduct.innerHTML = "";
  showError.textContent = "";

  if (searchValue.length > 0 && filteredArray.length > 0) {
    showError.textContent = `Showing ${filteredArray.length} results for '${searchValue}'`;
    displayMovies(filteredArray);
  } else if (searchValue && filteredArray.length === 0) {
    showError.textContent = "No records found";
    displayMovies("No record founds");
  } else {
    displayMovies(allMovies);
  }
});
