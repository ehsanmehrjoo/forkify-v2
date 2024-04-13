import view from './View.js';
import previewView from './previewView.js';
import icons from "../../img/icons.svg";
class ResultsView extends view  {
    _parentElement = document.querySelector('.results');
    _errorMessage = `No recipes found for your query. Please try again!`;
    _successmessage = `Start by searching for a recipe or an ingredient. Have fun!`;
    _generateMarkup() {
      return this._data
        .map(bookmark => previewView.render(bookmark,false))
        .join('');
    }
}
// const a = new ResultsView();
// console.log(a);
export default new ResultsView();