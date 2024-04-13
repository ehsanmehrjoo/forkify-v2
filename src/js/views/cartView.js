import view from './View.js';
import previewView from './previewView.js'
import icons from "../../img/icons.svg";
class cartView extends view  {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = `No bookmark yet. Find nice recipe and bookmark it.`;
    _successmessage = `Start by searching for a recipe or an ingredient. Have fun!`;
    _generateMarkup() {
      return this._data
        .map(bookmark => previewView.render(bookmark, false))
        .join('');
    }
    addHandlerRender(handler){
      window.addEventListener('load', handler)
    }
   
}
const a = new cartView();
console.log(a);
export default new BookmarksView();