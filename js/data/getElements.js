const getElements = (recipes) => {
  const ingredients = [];
  const ustensils = [];
  const devices = [];

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredientObject) => {
      const { ingredient } = ingredientObject;
      if (!ingredients.includes(ingredient)) ingredients.push(ingredient);
    });
    ustensils.push(...recipe.ustensils);
    devices.push(recipe.appliance);
  });
  
  return {
    ingredients: [...new Set(ingredients)],
    ustensils: [...new Set(ustensils)],
    devices: [...new Set(devices)],
  };
};

export { getElements };
