import { initializeProxySearch } from "./proxySearch.js";
initializeProxySearch();

import { addEventsFilters } from "./components/filters.js";
import { renderRecipes } from "./components/recipesList.js";
import { addEventSearchbar } from "./components/searchBar.js";
import { getElements } from "./data/getElements.js";
import { recipes } from "./data/recipes.js";

const main = () => {
  const elements = getElements();

  addEventsFilters(elements);
  addEventSearchbar();
  renderRecipes(recipes);
};

main();
