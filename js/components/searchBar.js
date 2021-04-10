import { updateSearchFromNamespace } from "../utils/store.js";

const addEventSearchbar = () => {
  const searchInput = document.getElementById("search-bar");

  searchInput.addEventListener("keyup", () => {
    updateSearchFromNamespace(searchInput.value);
  });
};

export { addEventSearchbar };
