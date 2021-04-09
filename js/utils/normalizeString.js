// This function reformat string for comparaison.
// manage accents and case insensitive

const normalizeString = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export { normalizeString };
