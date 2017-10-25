const knex = require("../db/knex.js");

module.exports = {
  renderLogin: function(req, res) {
    res.render('airlinelogin',{message: req.session.message});
    req.session.message = null;
  },

  login: function(req, res) {
    knex('admin')
      .where('username', req.body.username)
      .limit(1)
      .then((resultArr) => {
        let user = resultArr[0];
        if (user) {
          encryption.check(user, req.body)
            .then((isValid) => {
              if (isValid) {
                req.session.airline = user.airline_id;
                res.redirect('/airlines');
              } else {
                req.session.message = "You entered an invalid username or password.";
                res.redirect('/airlines/login');
              }
            })
        } else {
          req.session.message = "You entered an invalid username or password."
          res.redirect('/airlines/login');
        }
      }).catch((err) => {
        req.session.message = "You broke our webpage. Try again, nicely this time."
        res.redirect('/airlines/login');
      });
  },

  viewAll: function(req, res) {
    knex('flights')
      .where('airline_id', req.session.airline)
      .then(resultArr => {
        res.render('airline',{flights: resultArr, message: req.session.message});
        req.session.message = null;
      })
      .catch((err)=>{
        console.log(err);
        req.session.airline = null;
        req.session.message = "There was a problem. Please try again.";
        res.redirect('/airlines/login');
      })
  },

  create: function(req, res) {
    knex('flights')
      .insert({
        start: req.body.start,
        destination: req.body.destination,
        airline_id: req.session.airline
      }, '*')
      .then((result)=>{
        req.session.message = "Added flight!"
        res.redirect('/airlines');
      })
      .catch((err)=>{
        console.log(err);
        req.session.message = "There was an error adding the flight. Try again.";
        res.redirect('/airlines');
      })
  }
};
