const formatUnit = (unit) => {
  switch (unit) {
    case "gramme":
    case "grammes":
      return "g";
    case "cuillères à soupe":
    case "cuillère à soupe":
      return "c.à.s";
    case "cuillères à café":
    case "cuillère à café":
      return "c.à.c";
    case "litres":
    case "litre":
      return "L";
    default:
      return unit;
  }
};

const formatDescription = (description) =>
  description.length > 180
    ? `${description.substring(0, 182)} ...`
    : description;

const renderIngredients = (recipe) => {
  const { ingredients } = recipe;
  let ingredientsHTML = "";

  ingredients.forEach((item) => {
    ingredientsHTML += "<div>";
    ingredientsHTML += `<span class="recipe-ingredient">${
      item.ingredient + ("quantity" in item ? ":" : "")
    }</span>`;
    if ("quantity" in item) {
      ingredientsHTML += `<span class="recipe-value"> ${item.quantity}`;
      ingredientsHTML +=
        "unit" in item ? ` ${formatUnit(item.unit)}</span>` : "</span>";
    }
    ingredientsHTML += "</div>";
  });
  return ingredientsHTML;
};

const renderRecipes = (recipes) => {
  const recipesListNode = document.getElementById("recipes-list");

  recipesListNode.innerHTML = "";

  recipes.forEach((recipe) => {
    const recipeContainer = document.createElement("article");
    recipeContainer.className = "recipe-container";
    recipeContainer.id = `recipe-id-${recipe.id}`;
    recipeContainer.innerHTML = `<div class="recipe-illustration"></div>
    <div class="recipe-informations-block">
      <div class="recipe-informations-head">
        <h3 class="recipe-title">${recipe.name}</h3>
        <span class="recipe-time-block">
          <span class="far fa-clock time-icon"></span>
          <span class="time-value">${recipe.time} min</span>
        </span>
      </div>
      <div class="recipe-informations-content">
        <div class="recipe-ingredients-block">${renderIngredients(recipe)}</div>
        <div class="recipe-preview">${formatDescription(
          recipe.description
        )}</div>
      </div>
    </div>`;

    recipesListNode.append(recipeContainer);
  });
};

export { renderRecipes };
