const search_button = document.getElementsByClassName("search_button")[0];
const home_button = document.getElementsByClassName("home_button")[0];


search_button.addEventListener('click', searchButtonClick);
home_button.addEventListener('click', goHome);

function goHome(){
    fetch('/', {
        method: 'GET'
    }) .then(response => {
        
        window.location.href = '/'
    });
}

async function searchButtonClick(){
    let select = document.getElementsByClassName("searchTypeSelector")[0];
    let req = document.getElementsByClassName("search_request")[0];
    if(select.value == "по метке"){
        res = { 
            sel_val: select.value,
            req_val: req.value 
        }
        fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
            body: JSON.stringify(res)
        }).then(response => response.json())
        .then(json => updateTable(json))
    } 
    if(select.value == "по слову в заголовке"){
        res = { 
            sel_val: select.value,
            req_val: req.value 
        }
        fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
            body: JSON.stringify(res)
        }).then(response => response.json())
        .then(json => updateTable(json))
    } 
    if(select.value == "по слову в тексте"){
        res = { 
            sel_val: select.value,
            req_val: req.value 
        }
        fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
            body: JSON.stringify(res)
        }).then(response => response.json())
        .then(json => updateTable(json))
    } 
}

function updateTable(json){
    let  trs = document.querySelectorAll("tr");
    for(let i = 1; i < trs.length; i++){
        trs[i].remove();
    }
    let table = document.getElementsByTagName("table")[0];
    for(let i = 0; i < json.length; i++){
        let trTag = document.createElement('tr');
        
        let tdTag = document.createElement('td');
        tdTag.innerHTML = json[i].note;
        trTag.appendChild(tdTag);

        tdTag = document.createElement('td');
        tdTag.innerHTML = json[i].note_text;
        trTag.appendChild(tdTag);

        tdTag = document.createElement('td');
        for(let j = 0; j < json[i].file_dir.length; j++){
            split = json[i].file_dir[j].split('.')
            aTag = document.createElement('a');
            aTag.innerHTML = "Файл_" + j + " ";
            aTag.href = "/userFiles/" + json[i].file_dir[j];
            aTag.download = "Note-" + json[i].id + "-File-" + j + '.' + split[split.length - 1];
            tdTag.appendChild(aTag);
        }
        trTag.appendChild(tdTag);

        tdTag = document.createElement('td');
        for(let j = 0; j < json[i].selected_chips.length; j++){
            if(json[i].selected_chips.length != 1){
                if(j != json[i].selected_chips.length - 1)
                    tdTag.innerHTML += json[i].selected_chips[j] + ', ';
                    else tdTag.innerHTML += json[i].selected_chips[j];  
            } else {
                tdTag.innerHTML = json[i].selected_chips[j];
            }
        }
        trTag.appendChild(tdTag);

        table.appendChild(trTag);
    }
}