 import icons from '/src/img/icons.svg'; // Parcel 2

export default class View {
  _data;

  /**
   * Render the received  object to the DOM
   * @param {Object | Object[]} data the data to rendered (e.g. recipe)
   * @param {boolean} [render=true] if false create markup string instead  of rendering to DOM
   * @returns {undefined | string} A markup string is returned if render is false
   * @this {Object} View Object instance
   * @author Ehsan Mehrjo
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if(!render) return markup;
     

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data){
    if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError()
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
     const newElement = Array.from(newDom.querySelectorAll('*')) ;
     const curElement = Array.from(this._parentElement.querySelectorAll('*')) ;
    //  console.log(curElement);
    //  console.log(newElement);

     newElement.forEach((newEl, i) => {
      const curEl =  curElement[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Update Changed TEXT
      if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){
        // console.log('💥💥💥',newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }
         // Update Changed ATTRIBUTES
      if(!newEl.isEqualNode(curEl) ){
        console.log('💥💥💥',Array.from(newEl.attributes));
         Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value)
         })
      }

     })
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
 
}
