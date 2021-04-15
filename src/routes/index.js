const loginRoute = require('./login');
const signUpRoute = require('./signup');
const homeRoute = require('./home');
const openAppRoute = require('./openApp');
const checkActiveRoute = require('./checkActiveRoute');
const logOutRoute = require('./logOut');
const updateAvatarRoute = require('./updatAvatar');
const updateInfoRoute = require('./updateInfo');
const searchRoute = require('./search');

module.exports = (app) => {
  app.use('/', searchRoute)
  app.use('/user/update-info', updateInfoRoute);
  app.use('/user/update-avatar', updateAvatarRoute);
  app.use('/logout', logOutRoute);
  app.use('/login', loginRoute);
  app.use('/signup', signUpRoute);
  app.use('/login-register', openAppRoute);
  app.use('/', checkActiveRoute);
  app.use('/', homeRoute);
}
