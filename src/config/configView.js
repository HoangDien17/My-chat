const handlebars = require('express-handlebars');

let ConfigView = (app) => {
  app.engine('.hbs', handlebars({extname: '.hbs'}));
  app.set('view engine', '.hbs');
};

module.exports = ConfigView;
