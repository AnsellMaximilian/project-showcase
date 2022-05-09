const title = document.getElementById("title");

// Preview Section
const previewSection = document.getElementById("preview");
const previewImage = previewSection.querySelector("img");
const previewDescription = previewSection.querySelector("h2");
const previewSummary = previewSection.querySelector("p");

// Ingredients Section
const ingredientsSection = document.getElementById("ingredients");
const ingredientList = ingredientsSection.querySelector("ul");

// Steps Section
const stepsSection = document.getElementById("steps");
const stepsListContainer = stepsSection.querySelector("#steps-list-container");

const getRecipe = async () => {
  try {
    const {
      data: {
        recipes: [recipe],
      },
    } = await axios.get(
      "https://api.spoonacular.com/recipes/random?apiKey=1fbea3a03746450ba412eafa8dd62ab6"
    );

    return recipe;
  } catch (error) {
    console.log(error);
  }
};

const displayRandomRecipe = async () => {
  const {
    image,
    instructions,
    extendedIngredients,
    title: recipeTitle,
    summary,
  } = await getRecipe();
  title.innerText = recipeTitle;
  previewImage.src = image;
  previewImage.alt = recipeTitle;
  previewDescription.innerText = "Finished" + recipeTitle;
  previewSummary.innerHTML = summary;
  stepsListContainer.innerHTML = instructions;
  extendedIngredients.forEach((ingredient) => {
    const { name } = ingredient;
    const ingredientListItem = document.createElement("li");
    ingredientListItem.innerText = name;
    ingredientList.appendChild(ingredientListItem);
  });
};

displayRandomRecipe();
