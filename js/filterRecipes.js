// This is the function to filter the list of recipes.
// It returns a new list to render

import { normalizeString } from "./utils/normalizeString.js";

// Search is send as normalized already
const filterSearch = (recipe, search) => {
  if (normalizeString(recipe.name).includes(search)) return true;
  if (normalizeString(recipe.appliance).includes(search)) return true;
  if (normalizeString(recipe.description).includes(search)) return true;

  const { ingredients } = recipe;
  const { ustensils } = recipe;

  for (let index = 0; index < ingredients.length; index++) {
    const { ingredient } = ingredients[index];

    if (normalizeString(ingredient).includes(search)) return true;
  }

  for (let index = 0; index < ustensils.length; index++) {
    const ustensil = ustensils[index];

    if (normalizeString(ustensil).includes(search)) return true;
  }
  return false;
};

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
    let isTagged = false;
    const recipe = recipes[index];

    // Tags
    if (tags.length === 0) {
      isTagged = true;
    } else {
      const tagResults = [];

      for (let tagIndex = 0; tagIndex < tags.length; tagIndex++) {
        const tag = tags[tagIndex];
        tagResults.push(checkTag(recipe, tag.value, tag.type, tagTypes));
      }
      if (!tagResults.includes(false)) isTagged = true;
    }

    // Search
    if (search.length === 0) {
      result.push(recipe);
      continue;
    }
    if (isTagged && filterSearch(recipe, normalizeString(search))) {
      result.push(recipe);
    }
  }
  return result;
};

export { filterRecipes };
