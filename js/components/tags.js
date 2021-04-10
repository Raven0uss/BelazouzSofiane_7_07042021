import { normalizeString } from "../utils/normalizeString.js";
import { onClick } from "../utils/onClick.js";
import { removeTagFromNamespace, storeTagToNamespace } from "../utils/store.js";

const removeTag = (element, tag) => {
  element.remove();
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
    // The device is an uniq field, so if the new tag selected is also device, we replace
    // the previous one with the new tag selected
    if (type === "device" && `tag tag-${type}` === tag.className) {
      removeTag(tag, { value: tag.innerText, type });
      return false;
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
};

export { addTag };
