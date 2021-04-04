const Handlebars = require('handlebars');

module.exports = () => {
  Handlebars.registerHelper("isChecked", function (check, value ) {
    return (check == value) ? "checked" : "";
  });
};
