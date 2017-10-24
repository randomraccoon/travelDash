const knex = require("../db/knex.js");

module.exports = {
  viewAll: function(req, res) {
    let returnObj = {name:"",trips:[],flights:[]};
    knex('users')
      .select('name')
      .where('id', req.session.user)
      .limit(1)
      .then((resultArr)=>{
        returnObj.name = resultArr[0].name;
        console.log(returnObj.name);
        knex('trips')
          .select('id')
          .where('user_id', req.session.user)
          .then((resultArr)=> {
            console.log(resultArr);
            res.render('pages/trips',returnObj);
          })

      });
  },
};


// {name:name, flights:[ids], trips:[{trips}]}
