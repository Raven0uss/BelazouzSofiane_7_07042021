import { recipes } from "./data/recipes.js";
import { filterRecipes } from "./filterRecipes.js";
import { renderRecipes } from "./components/recipesList.js";
import { updateListRendering } from "./components/filters.js";

// Global variable with all the parameters of the search
// Stored in lpp (les petits plats) namespace

const initializeProxySearch = () => {
  window.lppNamespace = {
    searchModule: {
      value: {
        tags: [],
        search: "",
      },
    },
  };

  // I was wondering, two ways were possible :
  // - Store directly the filtered recipes and render it
  // - Or the one I choosed, store the searched keywords and tags to send to the filter algo
  // The reasons of my choice are for privacy of data (when connected to back) and the amount of data stored in the namespace

  const searchModuleValue = window.lppNamespace.searchModule.value;

  const proxySearch = new Proxy(searchModuleValue, {
    set: (target, key, value) => {
      target[key] = value;

      const recipesFiltered = filterRecipes({
        recipes,
        ...target,
      });

      renderRecipes(recipesFiltered);
      updateListRendering(recipesFiltered);
      return true;
    },
  });

  window.lppNamespace.searchModule = {
    value: searchModuleValue,
    proxySearch,
  };
};

export { initializeProxySearch };
