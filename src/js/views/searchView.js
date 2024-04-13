class SearchView {
    _parentElment = document.querySelector('.search');
    getQuery(){
        const query  = this._parentElment.querySelector('.search__field').value;
        this._clearInput();
        return query;
    }
    addHandlersearch(handler){
        this._parentElment.addEventListener('submit', function(e){
            e.preventDefault();
            handler();
    
        });
    }

    _clearInput(){
        this._parentElment.querySelector('.search__field').value = " "
    }

   
}

export default new SearchView();