const db = require("../database/db")

function getStartPage(request, response){
    try{
        response.render('startPage');

    } catch(error) {
        console.log(error.stack);
        response.sendStatus(500);
    }
};

function getSearchPage (request, response){
    try{
        response.render('searchPage');

    } catch(error) {
        console.log(error.stack);
        response.sendStatus(500);
    }
};

async function getAddPage (request, response){
    try{
        const chips = await db.query("SELECT * FROM chips");
        response.render('addPage', {
            chips: chips.rows
        });
    } catch(error) {
        console.log(error.stack);
        response.sendStatus(500);
    }
};

module.exports = {
    getStartPage, getSearchPage, getAddPage
};