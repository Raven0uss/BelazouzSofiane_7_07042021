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

const renderList = (list, element, type) => {
  const listElement = element.querySelector(".filter-list-container");

  listElement.innerHTML = "";
  list.forEach((item) => {
    const itemNode = document.createElement("span");
    itemNode.setAttribute("tabindex", "0");
    itemNode.className = "filter-list-element";
    itemNode.innerText = item;
    onClick(itemNode, () => addTag(item, type));
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

    renderList(list, element, type);

    element.addEventListener("focusin", () => {
      arrow.className = "fas fa-chevron-up";
      input.placeholder = getPlaceholder(type, true);
    });

    element.addEventListener("focusout", () => {
      arrow.className = "fas fa-chevron-down";
      input.placeholder = getPlaceholder(type, false);
    });

    input.addEventListener("keyup", () => {
      const { value } = input;
      const listFiltered = list.filter((item) =>
        normalizeString(item).includes(normalizeString(value))
      );
      renderList(listFiltered, element, type);
    });
  });
};

export { addEventsFilters };
