import { getElements } from "../data/getElements.js";
import { recipes } from "../data/recipes.js";
import { filterRecipes } from "../filterRecipes.js";
import { normalizeString } from "../utils/normalizeString.js";
import { onClick } from "../utils/onClick.js";
import { addTag } from "./tags.js";

const getType = (id) => {
  switch (id) {
    case "filter-ingredient":
      return "ingredient";
    case "filter-device":
      return "device";
    case "filter-ustensil":
      return "ustensil";
  }
};

const getPlaceholder = (type, open) => {
  switch (type) {
    case "ingredient":
      return open ? "Recherche un ingrédient" : "Ingrédients";
    case "device":
      return open ? "Recherche un appareil" : "Appareil";
    case "ustensil":
      return open ? "Recherche un ustensile" : "Ustensiles";
  }
};

const getListFromCurrentStateRecipes = (key) => {
  const recipesFiltered = filterRecipes({
    recipes,
    ...window.lppNamespace.searchModule.value,
  });

  const newRecipesData = getElements(recipesFiltered);
  return newRecipesData[key];
};

const tagIsSelected = (value, type) => {
  const { tags } = window.lppNamespace.searchModule.value;
  for (let index = 0; index < tags.length; index++) {
    const tag = tags[index];

    if (
      normalizeString(tag.value) === normalizeString(value) &&
      normalizeString(tag.type) === normalizeString(type)
    )
      return true;
  }
  return false;
};

const updateListRendering = (recipes) => {
  const recipesData = getElements(recipes);
  for (const key in recipesData) {
    const list = recipesData[key];
    const id = key.slice(0, -1);
    const element = document.getElementById(`filter-${id}`);
    renderList(list, element, id);
  }
};

const renderList = (list, element, type) => {
  const listElement = element.querySelector(".filter-list-container");
  const input = element.firstElementChild;

  listElement.innerHTML = "";
  list.forEach((item) => {
    if (tagIsSelected(item, type)) return;
    const itemNode = document.createElement("span");
    itemNode.setAttribute("tabindex", "0");
    itemNode.className = "filter-list-element";
    itemNode.innerText = item;
    onClick(itemNode, () => {
      addTag(item, type);
      input.value = "";
      input.focus();
    });
    listElement.append(itemNode);
  });
};

const addEventsFilters = (elements) => {
  const filters = document.getElementsByClassName("filter-wrapper");

  Array.from(filters).forEach((element) => {
    const { id } = element;
    const type = getType(id);
    const list = elements[`${type}s`];

    const input = element.firstElementChild;
    const arrow = document.getElementById(`arrow-${type}`);

    const recipesListNode = document.getElementById("recipes-list");

    renderList(list, element, type);

    element.addEventListener("focusin", () => {
      arrow.className = "fas fa-chevron-up";
      input.placeholder = getPlaceholder(type, true);
      recipesListNode.style.marginTop = "82px";
    });

    element.addEventListener("focusout", () => {
      arrow.className = "fas fa-chevron-down";
      input.placeholder = getPlaceholder(type, false);
      recipesListNode.style.marginTop = "25px";
    });

    input.addEventListener("keyup", () => {
      const { value } = input;
      const currentList = getListFromCurrentStateRecipes(`${type}s`);
      const listFiltered = currentList.filter((item) =>
        normalizeString(item).includes(normalizeString(value))
      );
      renderList(listFiltered, element, type);
    });
  });
};

export { addEventsFilters, updateListRendering };
