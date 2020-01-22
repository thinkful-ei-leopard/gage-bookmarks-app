import $ from 'jquery';
import api from './api';
import store from './store';
import bookmarks from './bookmarks';
import 'normalize.css';
import './style.css';

const main = function () {
  api.getItems()
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      bookmarks.render();
      bookmarks.bindEventListeners();
    })
    .catch(error => {
      store.setError(error.message);
      bookmarks.render();
      bookmarks.bindEventListeners();
    });
};

$(main);

