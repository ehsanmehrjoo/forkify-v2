import View from '../views/View.js'
import icons from "../../img/icons.svg";

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _message = 'Recipe was successfully uploaded!';

    _overlay = document.querySelector('.overlay');
    _window = document.querySelector('.add-recipe-window');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');
    _ingredient_1 = document.querySelector('#ingredient-1');
    _ingredient_2 = document.querySelector('#ingredient-2')
    _ingredient_3 = document.querySelector('#ingredient-3')
    _ingredient_4 = document.querySelector('#ingredient-4')
    _ingredient_5 = document.querySelector('#ingredient-5')
    _ingredient_6 = document.querySelector('#ingredient-6')
    _addIngredient = document.querySelector('#addIngredient');
    _ingEle = document.querySelector('.ing');
    _ing = 6;
   

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHeightWindow();
        this.addHandlerUpload();
        this.addIngredientt();

    } 

    _toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }
    
    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this._toggleWindow.bind(this));
    }
    _addHandlerHeightWindow(){
        this._btnClose.addEventListener('click', this._toggleWindow.bind(this));
        this._overlay.addEventListener('click', this._toggleWindow.bind(this));
    }

    validateIngredient(input) {
        return input.trim() !== '';
    }
    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const formElement = e.target; // Get the form element

            // Create FormData object using the form element
            const dataArr = [...new FormData(formElement)];
            const data = Object.fromEntries(dataArr);

            const validIngredients = Object.values(data).every(input => this.validateIngredient(input));
            if (!validIngredients) {
                alert('Please enter valid ingredients!');
                return;
            }
            
            // Check if handler is a function before calling it
            if (typeof handler === 'function') {
                handler(data);
            } else {
                console.error('Handler is not a function');
            }
        });
    }
  
    addIngredientt() {
        this._addIngredient.addEventListener('click', () => {
          this._ing++;
          let newLabel = document.createElement('label');
          newLabel.textContent = `Ingredient ${this._ing}`;
      
          let newInput = document.createElement('input');
          newInput.type = 'text';
          newInput.id = `ingredient-${this._ing}`;
          newInput.name = `ingredient-${this._ing}`;
          newInput.placeholder = "Format: 'Quantity,Unit,Description'";
      
          this._ingEle.appendChild(newLabel);  
          this._ingEle.appendChild(newInput); // Use appendChild to add new elements
        });
      }
      
}

export default new AddRecipeView();
