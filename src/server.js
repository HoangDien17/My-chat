const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');
require('dotenv').config();
const http = require('http');
const socketio = require('socket.io');
const cookieParser = require('cookie-parser');


const app = express();

// Init server with socketio & express
let server = http.createServer(app);  // Chia sẻ với socketio bằng cách dùng chung http
let io = socketio(server)

const db = require('./config/db');
const ConfigView = require('./config/configView');
const Route = require('./routes');
const Session = require('./config/session');
const initSockets = require('./sockets');
const configSocketIo = require('./config/socketio');

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
Session.configSession(app);

//flash-message
app.use(flash());

// cookie-parser
app.use(cookieParser());

//passport
app.use(passport.initialize());
app.use(passport.session());

//init router
Route(app);

//passport-socketio
configSocketIo(io);

//init socketio
initSockets(io);

// port
server.listen(process.env.PORT, () => {
  console.log(`Server is running on port:${process.env.PORT}!`);
});

