const RAPIDAPI_KEY = "https://nutrition-calculator.p.rapidapi.com/api/bmi?measurement_units=std&feet=5&inches=2&lbs=120"; 

const RAPIDAPI_HOST = "nutrition-calculator.p.rapidapi.com";

export async function calculateNutrition(ingredientText) {
  const url = "https://nutrition-calculator.p.rapidapi.com/api/nutrition";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": RAPIDAPI_KEY,
      "X-RapidAPI-Host": RAPIDAPI_HOST,
    },
    body: JSON.stringify({
      ingredientList: ingredientText,
    }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Nutrition API error:", error.message);
    return null;
  }
}