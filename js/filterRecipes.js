// This is the function to filter the list of recipes.
// It returns a new list to render

import { normalizeString } from "./utils/normalizeString.js";

const detectTagsType = (tags) => {
  const types = [];
  for (let index = 0; index < tags.length; index++) {
    const tag = tags[index];

    if (types.includes(tag.type)) continue;
    types.push(tag.type);
  }
  return types;
};

const checkTag = (recipe, value, type, tagTypes) => {
  const { ingredients } = recipe;
  const { ustensils } = recipe;

  if (tagTypes.includes(type) === false) return true;
  switch (type) {
    case "ingredient":
      for (let index = 0; index < ingredients.length; index++) {
        const element = ingredients[index];
        if (normalizeString(element.ingredient) === normalizeString(value))
          return true;
      }
      return false;
    case "device":
      if (normalizeString(recipe.appliance) === normalizeString(value))
        return true;
      return false;
    case "ustensil":
      for (let index = 0; index < ustensils.length; index++) {
        const ustensil = ustensils[index];
        if (normalizeString(ustensil) === normalizeString(value)) return true;
      }
      return false;
    default:
      return false;
  }
};

// VERSION B
const filterRecipes = ({ recipes, tags, search }) => {
  let result = [];

  if (search.length === 0 && tags.length === 0) return recipes;
  const tagTypes = detectTagsType(tags);
  for (let index = 0; index < recipes.length; index++) {
    const recipe = recipes[index];

    // Tags
    if (tags.length === 0) {
      result = Array.from(recipes);
    } else {
      const tagResults = [];

      for (let tagIndex = 0; tagIndex < tags.length; tagIndex++) {
        const tag = tags[tagIndex];
        tagResults.push(checkTag(recipe, tag.value, tag.type, tagTypes));
      }
      if (!tagResults.includes(false)) result.push(recipe);
    }

    // Search
    if (search.length === 0) continue;
  }
  return result;
};

export { filterRecipes };
