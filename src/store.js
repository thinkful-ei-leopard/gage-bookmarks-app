const items = [];
let error = null;
let filter = null;
let addingItem = false; //!! SHOULD BE FALSE BY DEFAULT
let tempRating = 0;

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
  tempRating,
  addingItem,
  setError,
  findById,
  addItem,
  updateItem,
  deleteItem
};