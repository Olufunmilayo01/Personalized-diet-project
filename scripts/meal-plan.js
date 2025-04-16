// scripts/meal-plan.js
document.getElementById("profileForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
  
    const extendedProfile = {
      ...storedProfile,
      age: document.getElementById("age").value,
      weight: document.getElementById("weight").value,
      height: document.getElementById("height").value,
      gender: document.getElementById("gender").value,
      activityLevel: document.getElementById("activityLevel").value,
      goal: document.getElementById("goal").value,
    };
  
    console.log("Combined User Profile:", extendedProfile);
  
    // You can now use `extendedProfile` to call your API or generate a meal plan
    generateMealPlan(extendedProfile);
  });
  
  function generateMealPlan(profile) {
    // Example logic — replace with API call or algorithm
    const mealsContainer = document.getElementById("mealsContainer");
    mealsContainer.innerHTML = `
      <p>Generating plan for ${profile.name} (${profile.goal})...</p>
      <ul>
        <li>Breakfast: Oatmeal with fruit</li>
        <li>Lunch: Grilled chicken salad</li>
        <li>Dinner: Steamed veggies with quinoa</li>
      </ul>
    `;
  }

  window.addEventListener("DOMContentLoaded", () => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (storedProfile) {
      document.getElementById("age").value = storedProfile.age || "";
      document.getElementById("gender").value = storedProfile.gender || "";
      document.getElementById("goal").value = storedProfile.goal || "";
    }
  });

  // scripts/meal-plan.js

document.addEventListener("DOMContentLoaded", async () => {
    const profileData = JSON.parse(localStorage.getItem("userProfile"));
  
    if (!profileData) {
      document.getElementById("mealsContainer").innerHTML = `
        <p>No profile found. Please <a href="profile.html">fill your profile</a> first.</p>
      `;
      return;
    }
  
    const calories = calculateCalories(profileData);
    const mealPlan = await fetchMealPlan(calories);
  
    displayMeals(mealPlan.meals);
  });
  
  // Calorie calculator
  function calculateCalories({ gender, age, weight, height, activityLevel, goal }) {
    const bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;
  
    const activityMultiplier = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
    };
  
    let calories = bmr * activityMultiplier[activityLevel];
    if (goal === "lose") calories -= 500;
    if (goal === "gain") calories += 500;
  
    return Math.round(calories);
  }
  
  // Fetch plan from Spoonacular
  async function fetchMealPlan(calories) {
    const url = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${calories}&apiKey=YhVjoBQWyvA2VnpEnQ4zKjhBmhrz5foZhKfes2n6`;
  
    const res = await fetch(url);
    return await res.json();
  }
  
  function displayMeals(meals) {
    const container = document.getElementById("mealsContainer");
    container.innerHTML = "";
  
    meals.forEach((meal) => {
      const card = document.createElement("div");
      card.classList.add("meal-card");
  
      card.innerHTML = `
        <h3>${meal.title}</h3>
        <img src="https://spoonacular.com/recipeImages/${meal.id}-480x360.jpg" alt="${meal.title}">
        <p><strong>Ready in:</strong> ${meal.readyInMinutes} mins</p>
        <p><strong>Servings:</strong> ${meal.servings}</p>
        <a href="${meal.sourceUrl}" target="_blank">View Recipe</a>
      `;
  
      container.appendChild(card);
    });
  }
  