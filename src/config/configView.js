const handlebars = require('express-handlebars');
const helpers = require('handlebars-helpers');
const handelbarsHelpers = require('./helperHandlebars');

let ConfigView = (app) => {
  app.engine('.hbs', handlebars({extname: '.hbs', helpers: helpers}));
  app.set('view engine', '.hbs');

  //config handlebars-helpers
  handelbarsHelpers();
};

module.exports = ConfigView;
