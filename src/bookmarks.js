import $ from 'jquery';
import api from './api';
import store from './store';

/**
 * *HTML TEMPLATES
 */
const generateBookmarksItemsString = function(items) {
  const completedItem = items.map((item) => generateItemElement(item));
  return completedItem.join('');
};

const generateItemElement = function (item) {
  let rating = item.rating;
  return `
    <div class='bookmark' data-item-id='${item.id}'>
        <div class='title-bar'>
            <span class='item-title title-overflow'>${item.title}</span>
            <div class='stars-container'>` 
            + generateStarRating(rating) + 
            `</div>
        </div>
        <div class='expanded hidden'>
            <p class='overflow'>
              ${item.desc}
            </p>
            <div class='expand-further'>
              <p>Click Here to Expand</p>
            </div>
            <div class='expanded-buttons'>
              <button type='button' class='edit-item'>Edit</button>
              <a href="${item.url}" class="visit-site-button action" role='button' target="blank">Visit Site</a>
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

const generateBadFilter = function() {
  return `
    <div class='title-bar_no-list'>
      <span>You have no bookmarks to show in this current filter. Please select an alternate one.</span>
    </div>`;
};

const generateEmptyList = function() {
  return `
    <div class='title-bar_no-list'>
      <span>You have no bookmarks! Add a new one using the button above.</span>
    </div>`;
};

const generateAddingPage = function() {
  return `  
    <h2>Add Bookmark</h2>
    <form class='add-form'>
        <label for='new-name' class='left'>Name This Bookmark</label>
        <input type='text' name='name-text' id='new-name' class='bottom-margin' placeholder='New Bookmark' required>
        <label for='new-url' class='left'>Insert URL (with https://)</label>
        <input type='url' name='url' id='new-url' class='bottom-margin' placeholder='https://example.com' required>
        <label for='new-desc' class='left'>Insert Description</label>
        <textarea name='description' id='new-desc' class='bottom-margin' placeholder='Description text...' required></textarea>
        <label for='new-rating'>Rate This Bookmark:</label>
        <div class='adding-rating'>
        ` + generateStarRating(store.tempRating) + `
        </div>
        <div class='confirm-cancel-buttons'>
         <button type="button" id='cancel'>Cancel</button>
         <button type="submit" id='new-submit' class='edit-confirm'>Confirm</button>
        </div>
    </form>`;
};

const generateEditingPage = function(item) {
  return `  
    <form class='edit-form'>
      <fieldset name='edit-bookmark'>
        <legend><h2 class='edit-header'>Edit Bookmark</h2></legend>
        <h3 class='edit-current-title'>${item.title}</h3>
        <label for='new-name' class='left'>Name This Bookmark</label>
        <input type='text' name='name-text' id='new-name' class='bottom-margin' value='${item.title}' required>
        <label for='new-url' class='left'>Insert URL (with https://)</label>
        <input type='url' name='url' id='new-url' class='bottom-margin' value='${item.url}' required>
        <label for='new-desc' class='left'>Insert Description</label>
        <textarea name='description' id='new-desc' class='bottom-margin' required>${item.desc}</textarea>
        <label for='new-rating'>Rate This Bookmark:</label>
        <div class='adding-rating'>
        ` + generateStarRating(item.rating) + `
        </div>
        <div class='confirm-cancel-buttons'>
        <button type="button" id='cancel'>Cancel</button>
        <button type="submit" id='new-submit' class='edit-confirm'>Confirm</button>
        </div>
      </fieldset>
    </form>`;
};

const generateError = function(message) {
  return `
    <section class="error-content">
      <button id="close-button">X</button>
      <p>${message}</p>
    </section>
  `;
};


/**
 ** EVENT HANDLERS
 */
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
        $('section').toggleClass('new-container container');
        $('.button-box').toggleClass('hidden');
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
    $(e.currentTarget).find('.item-title').toggleClass('title-overflow');
  });
};

const handleExpandFurther = function() {
  $('.container').on('click', '.expand-further', (e) => {
    $(e.currentTarget).siblings('p').toggleClass('overflow');
  });
};

const handleEditItemClicked = function() {
  $('.container').on('click', '.edit-item', (e) => {
    const id = getItemIdFromElement(e.currentTarget);
    const item = store.items.find(x => x.id === id);
    store.editingItem = id;
    render(item);
  });
};

const handleEditConfirmed = function() { //!! POSTS but doesn't render to list after submission
  $('main').on('submit', '.edit-form', (e) => {
    e.preventDefault();
    const newName = $('#new-name').val();
    const newUrl = $('#new-url').val();
    const newDesc = $('#new-desc').val();
    const newRating = store.tempRating;
    api.updateItem(store.editingItem, newName, newUrl, newDesc, newRating)
      .then(() => {
        store.editingItem = false;
        $('section').toggleClass('new-container container');
        $('.button-box').toggleClass('hidden');
        render();
      })
      .catch(error => {
        store.setError(error.message);
        renderError();
      });
  });
};

const handleDeleteItemClicked = function() {
  $('main').on('click', '.fa-trash-o', (e) => {
    const id = getItemIdFromElement(e.currentTarget); //Applies it to the nearest .container
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

const handleCancelClicked = function() {
  $('main').on('click', '#cancel', () => {
    store.addingItem = false;
    store.editingItem = false;
    render();
  });
};

/**
 * *MISC FUNCTIONS
 */
const getItemIdFromElement = function(item) {
  return $(item)
    .closest('.bookmark')
    .data('item-id');
};

const filterCheck = function(arr) {
  if (arr.length === 0) {
    return true;
  } else {
    return false;
  }
};

/**
 * *RENDER FUNCTIONS
 */
const renderError = function() {
  if(store.error) {
    $('.error-box').html(generateError(store.error));
  } else {
    $('.error-box').addClass('hidden');
  }
};

const renderAdding = function () {
  let addingPage = generateAddingPage();
  $('.container').html(addingPage);
};

const renderEditing = function(item) {
  let editingPage = generateEditingPage(item);
  $('.container').html(editingPage);
};

const renderList = function() {
  let items = [...store.items].reverse();
  if (store.filter >= 1 && store.filter <= 5) {
    let checkThis = items.filter(item => item.rating >= store.filter);
    let badFilter = (filterCheck(checkThis));
    if (badFilter === true && store.items.length !== 0) {
      $('.container').html(generateBadFilter());
    } else {
      $('.container').html(generateBookmarksItemsString(checkThis));
    }
  }
  else if (store.items.length === 0) {
    $('.container').html(generateEmptyList());
  } else {
    $('.container').html(generateBookmarksItemsString(items));
  }
};

const render = function(item) {
  $('.container').empty();
  renderError();
  if (store.editingItem !== false) {
    renderEditing(item);
    $('.button-box').toggleClass('hidden-buttons');
    $('section').toggleClass('container new-container');
  } else if (store.addingItem === true) {
    renderAdding();
    $('.button-box').toggleClass('hidden-buttons');
    $('section').toggleClass('container new-container');
  } else {
    renderList();
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
  handleEditConfirmed();
  handleCancelClicked();
  handleExpandFurther();
};

export default {
  render,
  bindEventListeners
};