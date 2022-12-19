const express = require("express");
const router = require("./routes/router");

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use('/', router);

app.listen(3000);