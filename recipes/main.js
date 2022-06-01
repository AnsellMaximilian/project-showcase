const container = document.querySelector("#container");

const title = document.querySelector("h1");

const previewImage = document.querySelector("#preview-img");
const previewSummary = document.querySelector("#summary");

const ingredientList = document.querySelector("#ingredients ul");

const instructionsList = document.querySelector("#instructions ol");

const loader = document.querySelector("#loader");

const meta = document.querySelector("#meta");
const tags = document.querySelector("#tags");

previewImage.addEventListener("load", (e) => finishLoad());

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

const span = (label) => {
  const el = document.createElement("span");
  el.textContent = label;
  return el;
};

const load = () => {
  container.style.display = "none";
  loader.style.display = "flex";
};

const finishLoad = () => {
  container.style.display = "block";
  loader.style.display = "none";
};

const displayRandomRecipe = async () => {
  try {
    load();
    const {
      image,
      extendedIngredients,
      title: recipeTitle,
      analyzedInstructions,
      summary,
      readyInMinutes,
      servings,
      vegetarian,
      glutenFree,
      vegan,
      dairyFree,
      cheap,
    } = await getRecipe();
    title.textContent = recipeTitle;
    previewImage.src = image;
    previewImage.alt = recipeTitle;
    previewSummary.innerHTML = summary;
    let stepNumber = 1;

    // reset
    meta.innerHTML = "";
    tags.innerHTML = "";
    instructionsList.innerHTML = "";

    const servingsBadge = document.createElement("span");
    servingsBadge.textContent = servings + " servings";
    meta.appendChild(servingsBadge);

    const readyBadge = document.createElement("span");
    readyBadge.textContent = readyInMinutes + " minutes";
    meta.appendChild(readyBadge);

    // Tags
    if (cheap) tags.appendChild(span("Cheap"));
    if (vegan) tags.appendChild(span("Vegan"));
    if (vegetarian) tags.appendChild(span("Vegetarian"));
    if (glutenFree) tags.appendChild(span("Gluten Free"));
    if (dairyFree) tags.appendChild(span("Dairy Free"));

    console.log(analyzedInstructions);
    analyzedInstructions.forEach((instruction) => {
      instruction.steps.forEach((step) => {
        const instructionListItem = document.createElement("li");
        const instructionListStep = document.createElement("span");
        instructionListStep.classList.add("step-number");
        console.log(stepNumber);
        instructionListStep.textContent = stepNumber++;

        const instructionListDetail = document.createElement("span");
        instructionListDetail.classList.add("step-detail");
        instructionListDetail.textContent = step.step;

        instructionListItem.appendChild(instructionListStep);
        instructionListItem.appendChild(instructionListDetail);

        instructionsList.appendChild(instructionListItem);
      });
    });

    extendedIngredients.forEach((ingredient) => {
      const { name, amount, unit } = ingredient;
      const ingredientListItem = document.createElement("li");

      ingredientListItem.innerText = `${amount}${
        unit ? ` ${unit} of ` : ""
      } ${name}`;
      ingredientList.appendChild(ingredientListItem);
    });
  } catch (error) {
    displayRandomRecipe();
  }
};

displayRandomRecipe();
