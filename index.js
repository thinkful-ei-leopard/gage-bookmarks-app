import $ from 'jquery';
import api from './api';
import store from '.store';
import bookmarks from './bookmarks';

const main = function () {
  api.getItems()
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      bookmarks.render();
    })
    .catch(error => {
      store.setError(error.message);
      bookmarks.render();
    });
    
  bookmarks.bindEventListeners(); //!! MAKE SURE ON USAGE
  bookmarks.render();
}

$(main);