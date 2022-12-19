const db = require("../database/db")

async function getAddPage(request, response){
    try{
        let filedata = request.files;
        let files = [];
        for(i = 0; i < filedata.length; i++){
            let str = filedata[i].filename;
            files.push(str);
        }
        await db.query("INSERT INTO notes VALUES(DEFAULT, $1, $2, $3, $4)", [request.body.note_name, request.body.note, files, request.body.ChooseChips]);
        response.sendStatus(200);

    } catch(error) {
        console.log(error.stack);
        response.sendStatus(500);
    }
};

async function getSearchReq(request, response){
    try{
        let selectType = request.body.sel_val;
        if(selectType == "по метке"){
            let notes = await db.query("SELECT * FROM public.notes WHERE $1 = ANY(selected_chips)", [request.body.req_val]);
            response.json(notes.rows)
        } else if(selectType == "по слову в заголовке"){
            let notes = await db.query("SELECT * FROM public.notes WHERE public.notes.note ILIKE '%' || $1 || '%'", [request.body.req_val]);
            response.json(notes.rows)
        } else if(selectType == "по слову в тексте"){
            let notes = await db.query("SELECT * FROM public.notes WHERE public.notes.note_text ILIKE '%' || $1 || '%'", [request.body.req_val]);
            response.json(notes.rows)
        }

    } catch(error) {
        console.log(error.stack);
        response.sendStatus(500);
    }
};

module.exports = {
    getAddPage, getSearchReq
};