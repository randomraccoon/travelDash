const knex = require("../db/knex.js");
const encryption = require('../config/encryption.js');

module.exports = {
  renderLogin: function(req, res) {
    res.render('pages/adminlogin',{message: req.session.message});
    req.session.message = null;
    console.log("Admin login load");
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
                res.redirect('/admin');
              } else {
                req.session.message = "You entered an invalid username or password.";
                res.redirect('/admin/login');
              }
            })
        } else {
          req.session.message = "You entered an invalid username or password."
          res.redirect('/admin/login');
        }
      }).catch((err) => {
        console.log(err);
        req.session.message = "You broke our webpage. Try again, nicely this time."
        res.redirect('/admin/login');
      });
  },

  logout: function(req, res) {
    req.session.admin = null;
    res.redirect('/admin/login');
    console.log("Logged out of admin");
  },

  index: function(req, res) {
    knex('airlines')
      .select('id','name')
      .then(resultArr=>{
        let airlines = resultArr;
        res.render('pages/admin', {airlines: airlines, message: req.session.message});
        req.session.message = null;
        console.log("Admin load");
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
          res.redirect('/admin');
        })
        .catch(() => {
          req.session.message = "You entered invalid data. Please register again."
          res.redirect('/admin');
        })
    });
  }
};
