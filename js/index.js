import { addEventsFilters } from "./components/filters.js";
import { getElements } from "./data/getElements.js";

const main = () => {
  const elements = getElements();

  addEventsFilters(elements);
};

main();
