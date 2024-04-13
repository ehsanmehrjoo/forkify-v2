import view from './View.js';
import previewView from './previewView.js';
import icons from "../../img/icons.svg";
class SortView extends view  {
    _parentElement = document.querySelector('.results');
    _btnSort = document.querySelector('.nav__btn--sort-search');
   
     // متد نمایش نتایج مرتب شده
  render(results) {
    this._data = results;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return this._data
      .map(result => previewView.render(result, false))
      .join('');
  }
    _addHandlerSort(handler) {
        this._btnSort.addEventListener('click', function(e){
            e.preventDefault();
            handler();
        });
    }
}

export default new SortView();