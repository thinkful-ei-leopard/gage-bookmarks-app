import $ from 'jquery';
import api from './api';
import store from './store';

const generateBookmarksItemsString = function(items) {
  const completedItem = items.map((item) => generateItemElement(item));
  return completedItem.join('');
};

const generateItemElement = function (item) {
  let rating = item.rating;
  return `
    <div class='bookmark' data-item-id='${item.id}'>
        <div class='title-bar'>
            <span>${item.title}</span>
            <div>` 
            + generateStarRating(rating) + 
            `</div>
        </div>
        <div class='expanded hidden'>
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

const generateStarRating = function(rating) {
  switch (rating) {
  case 1:
    return `
    <span class="fa fa-star star-1 checked" data-item-id='1'></span>
    <span class="fa fa-star star-2" data-item-id='2'></span>
    <span class="fa fa-star star-3" data-item-id='3'></span>
    <span class="fa fa-star star-4" data-item-id='4'></span>
    <span class="fa fa-star star-5" data-item-id='5'></span>`;
  case 2:
    return `
    <span class="fa fa-star star-1 checked" data-item-id='1'></span>
    <span class="fa fa-star star-2 checked" data-item-id='2'></span>
    <span class="fa fa-star star-3" data-item-id='3'></span>
    <span class="fa fa-star star-4" data-item-id='4'></span>
    <span class="fa fa-star star-5" data-item-id='5'></span>`;
  case 3:
    return `
    <span class="fa fa-star star-1 checked" data-item-id='1'></span>
    <span class="fa fa-star star-2 checked" data-item-id='2'></span>
    <span class="fa fa-star star-3 checked" data-item-id='3'></span>
    <span class="fa fa-star star-4" data-item-id='4'></span>
    <span class="fa fa-star star-5" data-item-id='5'></span>`;
  case 4:
    return `
    <span class="fa fa-star star-1 checked" data-item-id='1'></span>
    <span class="fa fa-star star-2 checked" data-item-id='2'></span>
    <span class="fa fa-star star-3 checked" data-item-id='3'></span>
    <span class="fa fa-star star-4 checked" data-item-id='4'></span>
    <span class="fa fa-star star-5" data-item-id='5'></span>`;
  case 5:
    return `
    <span class="fa fa-star star-1 checked" data-item-id='1'></span>
    <span class="fa fa-star star-2 checked" data-item-id='2'></span>
    <span class="fa fa-star star-3 checked" data-item-id='3'></span>
    <span class="fa fa-star star-4 checked" data-item-id='4'></span>
    <span class="fa fa-star star-5 checked" data-item-id='5'></span>`;
  default:
    return `
    <span class="fa fa-star star-1" data-item-id='1'></span>
    <span class="fa fa-star star-2" data-item-id='2'></span>
    <span class="fa fa-star star-3" data-item-id='3'></span>
    <span class="fa fa-star star-4" data-item-id='4'></span>
    <span class="fa fa-star star-5" data-item-id='5'></span>`;
  }
};

const generateAddingPage = function() {
  return `  
    <h2>Add Bookmark</h2>
    <form class='add-form'>
        <label for='new-name' class='left'>Name This Bookmark</label>
        <input type='text' name='name-text' id='new-name' class='bottom-margin' placeholder='New Bookmark' required>
        <label for='new-url' class='left'>Insert URL</label>
        <input type='url' name='url' id='new-url' class='bottom-margin' placeholder='https://example.com' required>
        <label for='new-description' class='left'>Insert Description</label>
        <textarea name='description' id='new-desc' class='bottom-margin' placeholder='Description text...' required></textarea>
        <label for='new-rating'>Rate This Bookmark:</label>
        <div class='adding-rating'>
        ` + generateStarRating(store.tempRating) + `
        </div>
        <button type="submit" id='new-submit'>Create!</button>
    </form>`;
};

const handleAddItem = function() { //!!??
  $('main').on('click', '#add-item', () => {
    store.addingItem = true;
    render();
  });
};

const handleAddItemSubmit = function() { //!! POSTS but doesn't render to list after submission
  $('main').on('submit', '.add-form', (e) => {
    e.preventDefault();
    const newName = $('#new-name').val();
    const newUrl = $('#new-url').val();
    const newDesc = $('#new-desc').val();
    const newRating = store.tempRating;
    api.createItem(newName, newUrl, newDesc, newRating)
      .then(() => {
        store.addingItem = false;
        render();
      })
      .catch(error => {
        store.setError(error.message);
        renderError();
      });
  });
};

const handleChangeRating = function() {
  $('main').on('click', '.adding-rating .fa-star',(e) => {
    store.tempRating = $(e.currentTarget)
      .data('item-id');
    $('.adding-rating').html(generateStarRating(store.tempRating));
  });
};

const handleSelectFilter = function() {
  $('#filter-items').change(() => {
    store.filter = parseInt($('#filter-items option:selected').val());
    render();
  });
};

const handleExpandDescription = function() {
  $('.container').on('click', '.title-bar', (e) => {
    $(e.currentTarget).next('.expanded').toggleClass('hidden');
  });
};

const handleEditItemClicked = function() { //!! Add to Edit Page function to render, get ID of element selected to edit, pass in parameters to template of edit page
  $('.container').on('click', '.edit-item', () => {
    console.log('click!!');
  });
};

const getItemIdFromElement = function(item) {
  return $(item)
    .closest('.bookmark')
    .data('item-id');
};

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

const handleDeleteItemClicked = function() {
  $('main').on('click', '.fa-trash-o', (e) => {
    const id = getItemIdFromElement(e.currentTarget);
    api.deleteItem(id)
      .then(() => {
        store.deleteItem(id);
        render();
      })
      .catch(error => {
        store.setError(error.message);
        renderError();
      });
  });
};

const handleErrorClose = function() {
  $('.error-box').on('click', '#close-button', () => {
    store.setError(null);
    renderError();
  });
};

const renderAdding = function () {
  let addingPage = generateAddingPage();
  $('.container').html(addingPage);
};

const renderList = function() {
  let items = [...store.items];
  
  if (store.filter >= 1 && store.filter <= 5) {
    items = items.filter(item => item.rating >= store.filter);
  }
  const bookmarksItemsString = generateBookmarksItemsString(items);
  $('.container').html(bookmarksItemsString);
};

const render = function() {
  renderError();
  if (store.addingItem === false) {
    renderList();
  } else if (store.addingItem === true) {
    renderAdding();
    $('.button-box').toggleClass('hidden');
    $('section').removeClass('container');
    $('section').addClass('new-container');
  }
};

const bindEventListeners = function () {
  handleAddItem();
  handleErrorClose();
  handleDeleteItemClicked();
  handleSelectFilter();
  handleExpandDescription();
  handleChangeRating();
  handleAddItemSubmit();
  handleEditItemClicked();
};

export default {
  render,
  bindEventListeners
};