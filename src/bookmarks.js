import $ from 'jquery';
import api from './api';
import store from './store';

const generateBookmarksItemsString = function(items) {
  const completedItem = items.map((item) => generateItemElement(item));
  return completedItem.join('');
};

const generateItemElement = function (item) {
  return `
    <div class='bookmark' data-item-id='${item.id}'>
        <div class='title-bar'>
            <span>${item.title}</span>
            ` + generateStarRating(item) + `
        </div>
        <div class='expanded'>
            <p>
              ${item.desc}
            </p>
            <div class='expanded-buttons'>
              <button type='button' class='edit-item'>Edit</button>
              <a href="${item.url}" class="visit-site-button" target="blank"><button>Visit Site</button></a>
              <i class="fa fa-trash-o"></i>
            </div>
        </div>
    </div>`;
};

const generateStarRating = function(item) {
  let rating = item.rating;
  switch (rating) {
  case 1:
    return `<div>
    <span class="fa fa-star star-1 checked"></span>
    <span class="fa fa-star star-2"></span>
    <span class="fa fa-star star-3"></span>
    <span class="fa fa-star star-4"></span>
    <span class="fa fa-star star-5"></span>
    </div>`;
  case 2:
    return `<div>
    <span class="fa fa-star star-1 checked"></span>
    <span class="fa fa-star star-2 checked"></span>
    <span class="fa fa-star star-3"></span>
    <span class="fa fa-star star-4"></span>
    <span class="fa fa-star star-5"></span>
    </div>`;
  case 3:
    return `<div>
    <span class="fa fa-star star-1 checked"></span>
    <span class="fa fa-star star-2 checked"></span>
    <span class="fa fa-star star-3 checked"></span>
    <span class="fa fa-star star-4"></span>
    <span class="fa fa-star star-5"></span>
    </div>`;
  case 4:
    return `<div>
    <span class="fa fa-star star-1 checked"></span>
    <span class="fa fa-star star-2 checked"></span>
    <span class="fa fa-star star-3 checked"></span>
    <span class="fa fa-star star-4 checked"></span>
    <span class="fa fa-star star-5"></span>
    </div>`;
  case 5:
    return `<div>
    <span class="fa fa-star star-1 checked"></span>
    <span class="fa fa-star star-2 checked"></span>
    <span class="fa fa-star star-3 checked"></span>
    <span class="fa fa-star star-4 checked"></span>
    <span class="fa fa-star star-5 checked"></span>
    </div>`;
  default:
    return `<div>
    <span class="fa fa-star star-1"></span>
    <span class="fa fa-star star-2"></span>
    <span class="fa fa-star star-3"></span>
    <span class="fa fa-star star-4"></span>
    <span class="fa fa-star star-5"></span>
    </div>`;
  }
}

const handleAddItem = function() {
  $('#add-item').click(() => {
    store.addingItem = true;
    render();
  });
};

const handleSelectFilter = function() {
  $('#filter-items').change(() => {
    store.filter = parseInt($('#filter-items option:selected').val());
    render();
  });
};

const handleExpandDescription = function() { //!!
  $('.title-bar').on('click', '.title-bar', (e) => {
    console.log('clicked');
  });
};

const expandDescription = function(item) { //!!
  $(item).next('.expanded').toggleClass('hidden');
};

const getItemIdFromElement = function(item) {
  return $(item)
    .closest('.bookmark')
    .data('item-id');
}

const generateError = function(message) {
  return `
    <section class="error-content">
      <button id="close-button">X</button>
      <p>${message}</p>
    </section>
  `;
};

const renderError = function() {
  if(store.error) {
    $('.error-box').html(generateError(store.error));
  } else {
    $('.error-box').addClass('hidden');
  }
};

const handleDeleteItemClicked = function() { //!!
  $('.fa-trash-o').click((e) => {
    const id = getItemIdFromElement(e.currentTarget);
  });
};

const handleErrorClose = function() {
  $('.error-box').on('click', '#close-button', () => {
    store.setError(null);
    renderError();
  });
};

const render = function () {
  renderError();
  let items = [...store.items];
  
  if (store.filter >= 1 && store.filter <= 5) {
    items = items.filter(item => item.rating >= store.filter);
  }
  const bookmarksItemsString = generateBookmarksItemsString(items);
  $('.container').html(bookmarksItemsString);
};

const bindEventListeners = function () {
  handleAddItem();
  handleErrorClose();
  handleDeleteItemClicked();
  handleSelectFilter();
  handleExpandDescription();
};

export default {
  render,
  bindEventListeners
};