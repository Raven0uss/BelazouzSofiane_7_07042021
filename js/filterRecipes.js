// This is the function to filter the list of recipes.
// It returns a new list to render

import { normalizeString } from "./utils/normalizeString.js";

// VERSION A

// Search is send as normalized already
const filterSearch = (recipe, search) => {
  if (normalizeString(recipe.name).includes(search)) return true;
  if (normalizeString(recipe.appliance).includes(search)) return true;
  if (normalizeString(recipe.description).includes(search)) return true;

  const { ingredients } = recipe;
  const { ustensils } = recipe;

  return (
    ingredients.some((item) =>
      normalizeString(item.ingredient).includes(search)
    ) ||
    ustensils.some((ustensil) => normalizeString(ustensil).includes(search))
  );
};

const detectTagsType = (tags) => {
  const types = tags.map((tag) => tag.type);
  return [...new Set(types)];
};

const checkTag = (recipe, value, type, tagTypes) => {
  if (tagTypes.includes(type) === false) return true;

  const { ingredients } = recipe;
  const { ustensils } = recipe;

  switch (type) {
    case "ingredient":
      return ingredients.some(
        (item) => normalizeString(item.ingredient) === normalizeString(value)
      );
    case "device":
      return normalizeString(recipe.appliance) === normalizeString(value);
    case "ustensil":
      return ustensils.some(
        (item) => normalizeString(item) === normalizeString(value)
      );
    default:
      return false;
  }
};

const filterRecipes = ({ recipes, tags, search }) => {
  if (tags.length === 0 && search.length === 0) return recipes;

  const tagTypes = detectTagsType(tags);
  const result = recipes.filter((recipe) => {
    let isTagged = tags.length === 0;
    if (!isTagged) {
      isTagged = !tags
        .map((tag) => checkTag(recipe, tag.value, tag.type, tagTypes))
        .includes(false);
    }
    if (search.length === 0) return isTagged;
    return filterSearch(recipe, normalizeString(search)) && isTagged;
  });
  return result;
};

export { filterRecipes };
