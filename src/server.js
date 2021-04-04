const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');
require('dotenv').config();

const app = express();

const db = require('./config/db');
const ConfigView = require('./config/configView');
const Route = require('./routes');
const configSession = require('./config/session');

//config db
db.Connect();

//config view
ConfigView(app);
app.set("views", path.join(__dirname, "views")); // mặc định vào views để tìm file hiển thị client

//config static file
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

//config session
configSession(app);

//flash-message
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());

//config router
Route(app);

// port
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port:${process.env.PORT}!`);
});

