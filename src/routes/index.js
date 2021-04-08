const loginRoute = require('./login');
const signUpRoute = require('./signup');
const homeRoute = require('./home');
const openAppRoute = require('./openApp');
const checkActiveRoute = require('./checkActiveRoute');
const logOutRoute = require('./logOut');
const updateAvatarRouter = require('./updatAvatar');
const updateInfoRouter = require('./updateInfo');

module.exports = (app) => {
  app.use('/user/update-info', updateInfoRouter);
  app.use('/user/update-avatar', updateAvatarRouter);
  app.use('/logout', logOutRoute);
  app.use('/login', loginRoute);
  app.use('/signup', signUpRoute);
  app.use('/login-register', openAppRoute);
  app.use('/', checkActiveRoute);
  app.use('/', homeRoute);
}
