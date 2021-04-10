import { normalizeString } from "../utils/normalizeString.js";
import { onClick } from "../utils/onClick.js";
import { removeTagFromNamespace, storeTagToNamespace } from "../utils/store.js";

const removeTag = (element, tag) => {
  element.remove();
  // When remove tag, call a function to send all the tag available
  removeTagFromNamespace(tag);
};

const checkExistingTag = (tagsContainer, value, type) => {
  const tags = Array.from(tagsContainer.childNodes);
  for (let index = 0; index < tags.length; index++) {
    const tag = tags[index];
    if (
      normalizeString(tag.innerText) === normalizeString(value) &&
      `tag tag-${type}` === tag.className
    ) {
      return true;
    }
  }
  return false;
};

const addTag = (value, type) => {
  const tagsContainer = document.getElementById("tags-container");

  if (checkExistingTag(tagsContainer, value, type)) return;

  const tag = document.createElement("span");
  tag.className = `tag tag-${type}`;
  tag.innerHTML = `${value}`;

  const cross = document.createElement("span");
  cross.className = "far fa-times-circle remove-tag";
  cross.setAttribute("tabindex", "0");
  cross.setAttribute("aria-label", "Remove tag");
  onClick(cross, () => removeTag(tag, { value, type }));
  tag.append(cross);

  storeTagToNamespace(value, type);
  tagsContainer.append(tag);
  // When add tag, call a function to send all the tag available
};

export { addTag };
