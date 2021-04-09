const onClick = (element, callback, keydown = true) => {
  element.addEventListener("click", callback);
  if (keydown)
    element.addEventListener("keydown", (e) => e.key === "Enter" && callback());
};

export { onClick };
