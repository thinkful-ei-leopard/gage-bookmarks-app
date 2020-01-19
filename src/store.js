const items = [];
let error = null;
let filter = null;
let addingItem = false;

const findById = function (id) {
  return this.items.find(currentItem => currentItem.id === id);
};

const addItem = function (item) {
  this.items.push(item);
};

const updateItem = function(id, newData) {
  const currentItem = this.findById(id);
  Object.assign(currentItem, newData);
};

const deleteItem = function (id) {
  this.items = this.items.filter(currentItem => currentItem.id !== id);
};

const setError = function(error) {
  this.error = error;
};

export default {
  items,
  error,
  filter,
  addingItem,
  setError,
  findById,
  addItem,
  updateItem,
  deleteItem
};