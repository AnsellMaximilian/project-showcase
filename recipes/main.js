const title = document.querySelector("h1");

const previewImage = document.querySelector("#preview-img");
const previewSummary = document.querySelector("#summary");

const ingredientList = document.querySelector("#ingredients ul");

const instructionsList = document.querySelector("#instructions ol");

const meta = document.querySelector("#meta");

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
    extendedIngredients,
    title: recipeTitle,
    analyzedInstructions,
    summary,
    readyInMinutes,
    servings,
  } = await getRecipe();
  title.textContent = recipeTitle;
  previewImage.src = image;
  previewImage.alt = recipeTitle;
  previewSummary.innerHTML = summary;

  const servingsBadge = document.createElement("span");
  servingsBadge.textContent = servings + " servings";
  meta.appendChild(servingsBadge);

  const readyBadge = document.createElement("span");
  readyBadge.textContent = readyInMinutes + " minutes";
  meta.appendChild(readyBadge);

  analyzedInstructions[0].steps.forEach((instruction) => {
    const { number, step } = instruction;
    const instructionListItem = document.createElement("li");
    const instructionListStep = document.createElement("span");
    instructionListStep.classList.add("step-number");
    instructionListStep.textContent = number;

    const instructionListDetail = document.createElement("span");
    instructionListDetail.classList.add("step-detail");
    instructionListDetail.textContent = step;

    instructionListItem.appendChild(instructionListStep);
    instructionListItem.appendChild(instructionListDetail);

    instructionsList.appendChild(instructionListItem);
  });

  extendedIngredients.forEach((ingredient) => {
    const { name, amount, unit } = ingredient;
    const ingredientListItem = document.createElement("li");

    ingredientListItem.innerText = `${amount}${
      unit ? ` ${unit} of ` : ""
    } ${name}`;
    ingredientList.appendChild(ingredientListItem);
  });
};

displayRandomRecipe();
