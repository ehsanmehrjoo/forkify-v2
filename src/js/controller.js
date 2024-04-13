import * as model from './model.js';
import recipeView  from './views/recipeView.js';
// import loadSearchResult from './model.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
// import sortView from '../js/views/sortView.js';
import PaginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addrecipeView from './views/addRecipeView.js';
import {MODEL_CLOSE} from '../js/config.js';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
// const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if(model.hot){
//   model.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe
    await model.loadRecipe(id);

    // 3) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    PaginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  PaginationView.render(model.state.search);
   
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
 try{
  // loding 
  addrecipeView.renderSpinner();
// Upload the new recipe data
 await model.uploadRecipe(newRecipe);
 console.log(model.state.recipe);

//  Render recipe
recipeView.render(model.state.recipe);

// Success message
addrecipeView.renderMessage()

//   Render BOOLMARK NEW
bookmarksView.render(model.state.bookmarks);

// change ID in the URL
const newRecipeId = model.state.recipe.id;
// تغییر شناسه در URL
const newUrl = `${window.location.origin}/${newRecipeId}`;
history.pushState(null, '', newUrl);

// Close form window
setTimeout(function(){
  addrecipeView._toggleWindow();
},MODEL_CLOSE * 1000)

 }catch(err){
console.error('💥💥💥',err);
addrecipeView.renderError(err.message);
 }
  
}


// const controlSortSearch = async function () {
//   try {
//     sortView.renderSpinner();

//     // 1) Get search query
//     const query = searchView.getQuery();
//     if (!query) return;

//     // 2) Load search results
//      model.sortByDuration();

//     // 3) Render results
//     sortView.render(model.sortByDuration());

//     // 4) Render initial pagination buttons
//     PaginationView.render(model.state.search);
//   } catch (err) {
//     console.log(err);
//   }
// };


// Subscriber
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlersearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  addrecipeView.addHandlerUpload(controlAddRecipe);
  // sortView._addHandlerSort(controlSortSearch);
  console.log('hi');
};
init();
