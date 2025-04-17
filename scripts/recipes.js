// const searchBtn = document.getElementById("searchBtn");
// const searchQueryInput = document.getElementById("searchQuery");
// const dietFilter = document.getElementById("dietFilter");
// const resultsContainer = document.getElementById("resultsContainer");

// const SPOON_API_KEY = "YOUR_SPOONACULAR_API_KEY"; // Replace with your key

// searchBtn.addEventListener("click", async () => {
//   const query = searchQueryInput.value;
//   const diet = dietFilter.value;

//   if (!query) return;

//   const response = await fetch(
//     `https:www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
//   );
//   const data = await response.json();
//   displayRecipes(data.results);
// });

// function displayRecipes(recipes) {
//   resultsContainer.innerHTML = "";

//   recipes.forEach(recipe => {
//     const card = document.createElement("div");
//     card.classList.add("recipe-card");

//     const nutrition = recipe.nutrition?.nutrients || [];

//     const calories = nutrition.find(n => n.name === "Calories")?.amount || "N/A";
//     const protein = nutrition.find(n => n.name === "Protein")?.amount || "N/A";
//     const fat = nutrition.find(n => n.name === "Fat")?.amount || "N/A";

//     card.innerHTML = `
//       <h3>${recipe.title}</h3>
//       <img src="${recipe.image}" alt="${recipe.title}">
//       <p><strong>Calories:</strong> ${calories}</p>
//       <p><strong>Protein:</strong> ${protein}g</p>
//       <p><strong>Fat:</strong> ${fat}g</p>
//       <a href="https://spoonacular.com/recipes/${recipe.title
//         .toLowerCase()
//         .replace(/ /g, "-")}-${recipe.id}" target="_blank">View Full Recipe</a>
//     `;
//     resultsContainer.appendChild(card);
//   });
// }

document.getElementById("button").addEventListener("click", () => {
  let inputValue = document.getElementById("inputName").value;
  let details = document.getElementById("details");
  details.innerHTML = "";
  fetch(`https:www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      const items = document.getElementById("items");
      items.innerHTML = "";
      if (data.meals == null) {
        document.getElementById("msg").style.display = "block";
      } else {
        document.getElementById("msg").style.display = "none";
        data.meals.forEach((meal) => {
          itemDiv = document.createElement("div");
          itemDiv.className = "m-2 singleItem";
          itemDiv.setAttribute("onclick", `details('${meal.idMeal}')`);
          let itemInfo = `
                  <div class="card " style="width: 12rem;">
                      <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                      <div class="card-body text-center">
                          <h5 class="card-text">${meal.strMeal}</h5>
                      </div>
                  </div>
                  `;
          itemDiv.innerHTML = itemInfo;
          items.appendChild(itemDiv);
        });
      }
    });
});


function details(id) {
  fetch(`https:www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((detail) => {
      let meal = detail.meals[0];
      console.log(meal);
      let details = document.getElementById("details");
      details.innerHTML = "";
      let detailsDiv = document.createElement("div");
      let detailsInfo = `
      <div class="card " style="width: 19rem;">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body ">
              <h3 class="card-text">${meal.strMeal}</h3>
              <h6>Ingredients</h6>
              <ul>
                  <li>${meal.strArea}</li>
                  <li>${meal.strCategory}</li>
                  <li>${meal.strIngredient1}</li>
                  <li>${meal.strIngredient2}</li>
                  <li>${meal.strIngredient3}</li>
                  <li>${meal.strIngredient4}</li>
                  <li>${meal.strIngredient5}</li>
              </ul>
          </div>
      </div>
      `;
      detailsDiv.innerHTML = detailsInfo;
      details.appendChild(detailsDiv);
    });
}
