const loginRoute = require('./login');
const signUpRoute = require('./signup');
const homeRoute = require('./home');
const openAppRoute = require('./openApp');
const checkActiveRoute = require('./checkActiveRoute');
const logOutRoute = require('./logOut');
const updateAvatarRoute = require('./updatAvatar');
const updateInfoRoute = require('./updateInfo');
const searchRoute = require('./search');
const unfriendRoute = require('./unfriend');
const addNewContactRoute = require('./newContact');
const removeRequestRoute = require('./removeRequest');
const addToFriendRoute = require('./addToFriend');
const infoContactRoute = require('./infoContact');


module.exports = (app) => {
  app.use("/info-contact", infoContactRoute);
  app.use('/handle-request', addToFriendRoute);
  app.use('/remove-request', removeRequestRoute);
  app.use('/add-contact', addNewContactRoute);
  app.use('/search-user', searchRoute);
  app.use('/delete-friend', unfriendRoute);
  app.use('/user/update-info', updateInfoRoute);
  app.use('/user/update-avatar', updateAvatarRoute);
  app.use('/logout', logOutRoute);
  app.use('/login', loginRoute);
  app.use('/signup', signUpRoute);
  app.use('/login-register', openAppRoute);
  app.use('/', checkActiveRoute);
  app.use('/', homeRoute);
}
