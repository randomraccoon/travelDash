const knex = require("../db/knex.js");
const encryption = require('../config/encryption.js');

module.exports = {
  renderLogin: function(req, res) {
    let message = {message: req.session.message};
    req.session.message = null;
    req.session.save(err=>{
      res.render('pages/airlinelogin', message);
      console.log("Airline login load");
    });
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
                req.session.save(err=>{
                  res.redirect('/airlines');
                });

              } else {
                req.session.message = "You entered an invalid username or password.";
                req.session.save(err=>{
                  res.redirect('/airlines/login');
                });
              }
            })
        } else {
          req.session.message = "You entered an invalid username or password."
          req.session.save(err=>{
            res.redirect('/airlines/login');
          });
        }
      }).catch((err) => {
        console.log(err);
        req.session.message = "You broke our webpage. Try again, nicely this time."
        req.session.save(err=>{
          res.redirect('/airlines/login');
        });
      });
  },

  logout: function(req, res) {
    req.session.airline = null;
    req.session.save(err=>{
      res.redirect('/airlines/login');
    });
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
            let returnObj = {airline: airline, flights: flights, message: req.session.message};
            req.session.message = null;
            req.session.save(err=>{
              res.render('pages/flights',returnObj);
              console.log("Flights load");
            });
          })
      })
      .catch((err)=>{
        console.log(err);
        req.session.airline = null;
        req.session.message = "There was a problem. Please try again.";
        req.session.save(err=>{
          res.redirect('/airlines/login');
        });
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
        req.session.save(err=>{
          res.redirect('/airlines');
        });
      })
      .catch((err)=>{
        console.log(err);
        req.session.message = "There was an error adding the flight. Try again.";
        req.session.save(err=>{
          res.redirect('/airlines');
        });
      })
  }
};
