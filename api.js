const BASE_URL = 'https://thinkful-list-api.herokuapp.com/gage';

function getItems() {
  return apiFetch(`${BASE_URL}/items`);
}

function createItem(name, url, description, rating) {
  let newItem = JSON.stringify({ name, url, description, rating});
  return apiFetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newItem
  });
}

function updateItem(id, updateData) { //?? MAY NEED ADJUSTING
  return apiFetch(`${BASE_URL}/items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  });
}

function deleteItem(id) {
  return apiFetch(`${BASE_URL}/items/${id}`, {
    method: 'DELETE'
  });
}

function apiFetch(...args) {
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
}
  
export default {
  getItems,
  createItem,
  updateItem,
  deleteItem
};