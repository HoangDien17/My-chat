const loginRouter = require('./login');
const signUpRouter = require('./signup');
const homeRouter = require('./home');

module.exports = (app) => {
  app.use('/login', loginRouter);
  app.use('/signup', signUpRouter);
  app.use('/', homeRouter);
}
