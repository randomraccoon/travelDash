const knex = require("../db/knex.js");

module.exports = {
  viewAll: function(req, res) {
    res.render('pages/trips');
  },
};
