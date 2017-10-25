const knex = require("../db/knex.js");
const encryption = require('../config/encryption.js');

module.exports = {
  renderLogin: function(req, res) {
    res.render('pages/airlinelogin',{message: req.session.message});
    req.session.message = null;
    console.log("Airline login load");
  },

  login: function(req, res) {
    knex('airline_users')
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
        console.log(err);
        req.session.message = "You broke our webpage. Try again, nicely this time."
        res.redirect('/airlines/login');
      });
  },

  logout: function(req, res) {
    req.session.airline = null;
    res.redirect('/airlines/login');
  },

  viewAll: function(req, res) {
    knex('flights')
      .where('airline_id', req.session.airline)
      .then(resultArr => {
        let flights = resultArr;
        knex('airlines')
          .where('id', req.session.airline)
          .then((resultArr)=>{
            let airline = resultArr[0];
            res.render('pages/flights',{airline: airline, flights: flights, message: req.session.message});
            req.session.message = null;
            console.log("Flights load");
          })
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
