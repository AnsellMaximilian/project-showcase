const title = document.getElementById("title");
const finishedImageSection = document.getElementById("finished-image");
const ingredientsSection = document.getElementById("ingredients");
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
  const { image, instructions, extendedIngredients } = await getRecipe();
  console.log({ image, instructions, extendedIngredients });
};

displayRandomRecipe();
