const session = require('express-session');
const connectMongo = require('connect-mongo');

const configSession = (app) => {
    app.use(session({
      store: connectMongo.create({
        mongoUrl: 'mongodb://localhost:27017/my_chat',
        autoRemove: 'interval',
      }),
        key: 'express.sid',
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000*60*60*24
        }
    }));
}

module.exports = configSession;
