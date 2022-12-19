const add_button = document.getElementsByClassName("startPage_button")[0];

add_button.addEventListener('click', addButtonClick);

function addButtonClick(){
    fetch('/add', {
        method: 'GET',
    }) 
    .then(response => {
        window.location.href = '/add'
    });
}

const search_button = document.getElementsByClassName("startPage_button")[1];

search_button.addEventListener('click', searchButtonClick);

function searchButtonClick(){
    fetch('/search', {
        method: 'GET',
    }) 
    .then(response => {
        window.location.href = '/search'
    });
}