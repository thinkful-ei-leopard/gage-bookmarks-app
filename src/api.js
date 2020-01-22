const BASE_URL = 'https://thinkful-list-api.herokuapp.com/gage';

const getItems = function() {
  return apiFetch(`${BASE_URL}/bookmarks`);
};

const createItem = function(title, url, desc, rating) {
  let newItem = JSON.stringify({ title, url, desc, rating});
  return apiFetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newItem
  });
};

const updateItem = function(id, title, url, desc, rating) { //?? MAY NEED ADJUSTING
  let updatedItem = JSON.stringify({ title, url, desc, rating});
  return apiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: updatedItem
  });
};

const deleteItem = function(id) {
  return apiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE'
  });
};

const apiFetch = function(...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if(!res.ok) {
        error = { code: res.status };
      }
  
      return res.json();
    })
    .then(data => {
      if(error) {
        error.message = data.message;
        return Promise.reject(error);
      }
  
      return data;
    });
};
  
export default {
  getItems,
  createItem,
  updateItem,
  deleteItem
};