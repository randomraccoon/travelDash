const knex = require("../db/knex.js");
const encryption = require('../config/encryption.js');

module.exports = {
  renderLogin: function(req, res) {
    let message = {message: req.session.message};
    req.session.message = null;
    req.session.save(err=>{
      res.render('pages/adminlogin',message);
      console.log("Admin login load");
    });
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
                req.session.admin = true;
                req.session.save(err=>{
                  res.redirect('/admin');
                });
              } else {
                req.session.message = "You entered an invalid username or password.";
                req.session.save(err=>{
                  res.redirect('/admin/login');
                });
              }
            })
        } else {
          req.session.message = "You entered an invalid username or password."
          req.session.save(err=>{
            res.redirect('/admin/login');
          });
        }
      }).catch((err) => {
        console.log(err);
        req.session.message = "You broke our webpage. Try again, nicely this time."
        req.session.save(err=>{
          res.redirect('/admin/login');
        });
      });
  },

  logout: function(req, res) {
    req.session.admin = null;
    req.session.save(err=>{
      res.redirect('/admin/login');
      console.log("Logged out of admin");
    });
  },

  index: function(req, res) {
    knex('airlines')
      .select('id','name','description')
      .then(resultArr=>{
        let airlines = resultArr;
        knex('airline_users')
          .select(['username', 'airlines.name'])
          .innerJoin('airlines','airline_users.airline_id','airlines.id')
          .then(resultArr=>{
            let returnObj = {airline_users: resultArr, airlines: airlines, message: req.session.message};
            req.session.message = null;
            req.session.save(err=>{
              res.render('pages/admin', returnObj);;
              console.log("Admin load");
            });
          })

      });
  },

  createAirlineUser: function(req, res) {
    encryption.hash(req.body).then((encryptedUser) => {
      // take the encrypted user and insert them into the db.
      knex('airline_users')
        .insert({
          username: encryptedUser.username,
          password: encryptedUser.password,
          airline_id: encryptedUser.airline_id
        })
        .then(() => {
          req.session.message = `Airline user "${encryptedUser.username}" created.`;
          req.session.save(err=>{
            res.redirect('/admin');
          });
        })
        .catch(() => {
          req.session.message = "You entered invalid data. Please register again."
          req.session.save(err=>{
            res.redirect('/admin');
          });
        })
    });
  }
};
