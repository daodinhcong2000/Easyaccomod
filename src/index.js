const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const { static } = require('express');
const { execPath } = require('process');
const app = express();
const port = 3001;
const route = require('./routes');
const cookie_parser = require('cookie-parser')
var bodyParser = require('body-parser')

//const conn = require('./app/config/db')

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
//console.log(path.join(__dirname, 'public/img' ))

/// AJAX, fetch, XMLHttpRequest
//app.use(express.json());
app.use(cookie_parser('luongvietanh'))
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: false }))
// templace

app.engine(
    'hbs',
    handlebars({
        extname: 'hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources' , 'views'));

//Routes init
route(app);
//conn.connecting;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

//403104933479-7h7na15vvrljel9fe21i52a5of4lf0dl.apps.googleusercontent.com
//9p8X1jeB_oTM_V552zKygdKA