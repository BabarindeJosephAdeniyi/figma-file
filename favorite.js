let favorites;

function displayFavorites(favorites) {
  console.log("Favorites:", favorites);

  const favoritesContainer = document.getElementById("favorites-container");

  if (favorites.length > 0) {
    const favoritesHTML = favorites
      .map(
        (value) => `
      <div class="product-item">
        <div class="product-image">
          <img src="https://image.tmdb.org/t/p/original${
            value.poster_path
          }" class="rounded-pilll" width="30%" alt="${value.title}">
        </div>
        <div class="product-title">${value.title}</div>
        <div class="product-description">${value.overview.substr(0, 25)}</div>
        <!-- Add other details you want to display -->
      </div>
      `,
      )
      .join("");

    favoritesContainer.innerHTML = favoritesHTML;
  } else {
    favoritesContainer.innerHTML = "No favorites yet.";
  }
}



document.addEventListener("DOMContentLoaded", function () {
  favorites = getFavoritesFromLocalStorage();
  displayFavorites(favorites);
});

