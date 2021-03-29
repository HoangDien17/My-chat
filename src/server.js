const express = require('express');
const path = require('path');

const app = express();
const db = require('./config/db');
const ConfigView = require('./config/configView');
const Router = require('./router');

//config db
db.Connect();

//config view
ConfigView(app);
app.set("views", path.join(__dirname, "views")); // mặc định vào views để tìm file hiển thị client

//config static file
app.use(express.static(path.join(__dirname, 'public')));

//config router
Router(app);


// port
app.listen(3000, () => {
  console.log('Server is running on port:3000!');
});

