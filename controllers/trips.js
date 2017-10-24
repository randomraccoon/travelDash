const knex = require("../db/knex.js");

module.exports = {
  viewAll: function(req, res) {
    knex('users')
      .select('name')
      .where('id', req.session.user)
      .limit(1)
      .then((resultArr)=>{
        console.log(resultArr);
        res.render('pages/trips');
      });
  },
};


// {name:name, flights:[ids], trips:[{trips}]}
