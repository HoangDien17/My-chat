const loginRoute = require('./login');
const signUpRoute = require('./signup');
const homeRoute = require('./home');
const openAppRoute = require('./openApp');
const checkActiveRoute = require('./checkActiveRoute');

module.exports = (app) => {
  app.use('/login', loginRoute);
  app.use('/signup', signUpRoute);
  app.use('/login-register', openAppRoute);
  app.use('/', checkActiveRoute);
  app.use('/', homeRoute);
}
