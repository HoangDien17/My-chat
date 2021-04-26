const session = require('express-session');
const MongoStore = require('connect-mongo');

let sessionStorage = MongoStore.create({
  mongoUrl: `${process.env.MONGODB_URI}`,
  autoRemove: 'interval'
})

let configSession = (app) => {
    app.use(session({
      store: sessionStorage,
      key: `${process.env.SESSION_KEY}`,
      secret: `${process.env.SESSION_SECRET}`,
      resave: false,
      saveUninitialized: false,
      cookie: {
          maxAge: 1000*60*60*24
      }
    }));
}

module.exports = {
  configSession,
  sessionStorage
};
