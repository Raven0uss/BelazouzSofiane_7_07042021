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
        <div class="recipe-ingredients-block">
          <div>
            <span class="recipe-ingredient">Lait de coco:</span>
            <span class="recipe-value">3</span>
          </div>
        </div>
        <div class="recipe-preview">${recipe.description}</div>
      </div>
    </div>`;

    recipesListNode.append(recipeContainer);
  });
};

export { renderRecipes };
