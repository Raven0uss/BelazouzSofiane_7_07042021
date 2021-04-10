const storeTagToNamespace = (value, type) => {
  const { tags } = window.lppNamespace.searchModule.value;
  tags.push({
    value,
    type,
  });

  window.lppNamespace.searchModule.proxySearch.tags = tags;
};

const removeTagFromNamespace = (tag) => {
  const { tags } = window.lppNamespace.searchModule.value;
  const index = tags.findIndex(
    (item) => item.value === tag.value && item.type === tag.type
  );

  if (index !== -1) {
    tags.splice(index, 1);
    window.lppNamespace.searchModule.proxySearch.tags = tags;
  }
};

const updateSearchFromNamespace = (value) => {
  window.lppNamespace.searchModule.proxySearch.search = value;
};

export {
  storeTagToNamespace,
  removeTagFromNamespace,
  updateSearchFromNamespace,
};
