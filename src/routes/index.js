const loginRoute = require('./login');
const signUpRoute = require('./signup');
const homeRoute = require('./home');

module.exports = (app) => {
  app.use('/login', loginRoute);
  app.use('/signup', signUpRoute);
  app.use('/', homeRoute);
}
