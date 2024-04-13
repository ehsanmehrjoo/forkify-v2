import View from '../views/View.js'
import icons from "../../img/icons.svg";

class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;
            
            const goToPage = +btn.dataset.goto;
            handler(goToPage)
        })
      }
      _generateMarkup(){
        const curPage = this._data.page;
        const newPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    
        let markup = ''; // Initialize markup variable
    
        // Page 1, and there are other pages
    
        // Last page
        if (curPage === newPages && newPages > 1) {
          for (let i = 1; i <= newPages; i++) {
            markup += `
                <button data-goto="${i}" class="btn--inline pagination__btn--next" style="float:left;">
                    <span>Page ${i}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                </button>
            `;
        }
        }
    
        // Other pages
        if (curPage < newPages) {
          for (let i = 1; i <= newPages; i++) {
            markup += `
                <button data-goto="${i}" class="btn--inline pagination__btn--next" style="float:left;">
                    <span>Page ${i}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }
        }
    
        return markup;
    }
    

}
export default new PaginationView();