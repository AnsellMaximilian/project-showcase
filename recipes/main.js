const title = document.getElementById("title");

// Finished Image
const finishedImageSection = document.getElementById("finished-image");
const finishedImage = finishedImageSection.querySelector("img");

// Ingredients Section
const ingredientsSection = document.getElementById("ingredients");

// Steps Section
const stepsSection = document.getElementById("steps");

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
  } = await getRecipe();
  title.innerText = recipeTitle;
  finishedImage.src = image;
  finishedImage.alt = recipeTitle;
};

displayRandomRecipe();
