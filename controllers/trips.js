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
          .where('user_id', req.session.user)
          .then((resultArr)=> {
            returnObj.trips = resultArr;
            console.log(resultArr.map(o=>o.id));
            knex('flights')
              .select('id')
              .then((resultArr)=> {
                returnObj.flights = resultArr.map(o=>o.id);
                res.render('pages/trips',returnObj);
              })
          })
      });
  },
};


// {name:name, flights:[ids], trips:[{trips}]}
