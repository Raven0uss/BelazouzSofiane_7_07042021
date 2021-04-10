import { recipes } from "./data/recipes.js";
import { filterRecipes } from "./filterRecipes.js";
import { renderRecipes } from "./components/recipesList.js";

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

  const searchModuleValue = window.lppNamespace.searchModule.value;

  const proxySearch = new Proxy(searchModuleValue, {
    set: (target, key, value) => {
      target[key] = value;

      const recipesFiltered = filterRecipes({
        recipes,
        ...target,
      });

      renderRecipes(recipesFiltered);
      return true;
    },
  });

  window.lppNamespace.searchModule = {
    value: searchModuleValue,
    proxySearch,
  };
};

export { initializeProxySearch };
