const express = require('express');
const path = require('path');

const db = require('./config/db');
const ConfigView = require('./config/configView');
const app = express();

//config db
db.Connect();

//config view
ConfigView(app);
app.set("views", path.join(__dirname, "views")); // mặc định vào views để tìm file hiển thị client

app.get('/', (req, res) => {
  res.render('home')
});


// port
app.listen(3000, () => {
  console.log('Server is running on port:3000!');
});

