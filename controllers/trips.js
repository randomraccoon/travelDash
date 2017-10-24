const knex = require("../db/knex.js");

module.exports = {
  viewAll: function(req, res) {
    //should send flights
    //should send user name
    res.render('pages/trips');
  },
};
