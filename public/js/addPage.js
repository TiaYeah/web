const addChipsButton = document.getElementsByClassName("add_chip")[0];
const addNoteButton = document.getElementsByClassName("form_button")[0];
const home_button = document.getElementsByClassName("home_button")[0];
const form = document.getElementsByClassName("form")[0];
const textarea = document.querySelector("textarea"); 

const ul = document.querySelector("ul");

let chips = [];
let choosenChips = [];

addChipsButton.addEventListener('click', addChipsButtonClick);
addNoteButton.addEventListener('click', addNoteButtonClick)
home_button.addEventListener('click', goHome);


addDefaultChips();

function goHome(){
    fetch('/', {
        method: 'GET'
    }) .then(response => {
        
        window.location.href = '/'
    });
}

function chooseChip(e){
    let chip = e.target.textContent;
    if (!choosenChips.includes(chip)){
        choosenChips.push(chip);
    } else {
        choosenChips.splice(choosenChips.indexOf(chip), 1);
    }
    e.target.classList.toggle('green');
}

function addDefaultChips(){
    chips1 = document.querySelectorAll("li");
    
    for(i=0;i<chips1.length;i++){
        chips1[i].addEventListener('click', chooseChip);
        chips.push(chips1[i].innerHTML);
    }
}

function createChip() {
    
    let liTag = document.createElement('li');
    liTag.innerHTML = chips[chips.length-1];
    liTag.addEventListener('click', chooseChip);
    ul.insertBefore(liTag, ul.lastChild.previousSibling)
}

function inputChip(e){
    if(e.key == "Enter"){
        e.preventDefault();
        let chip = e.target.value.replace(/\s+/g, ' ');
        if(chip.length > 1 && !chips.includes(chip)){
            chips.push(chip);
            e.target.remove();
            createChip();
        }
    }
}

async function addChipsButtonClick(e){
    let inputTag = document.createElement('input');
    inputTag.className = 'chip_input'
    
    ul.insertBefore(inputTag, ul.lastChild.previousSibling);
    input_ = ul.getElementsByClassName("chip_input")[0];
    input_.addEventListener('keyup', inputChip);
}

function addNoteButtonClick(e){
    
    let form = document.getElementsByClassName("form")[0];
    let formData = new FormData(form);
    for(let i = 0; i < choosenChips.length; i++){
        formData.append("ChooseChips[]", choosenChips[i]);
    }
    let values = Object.fromEntries(formData.entries());
    if(form.checkValidity()){
        form.submit();
        fetch('/add', {
            method: 'POST',
            body: formData
        }) 
    }
}
