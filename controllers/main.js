const knex = require("../db/knex.js");
const encryption = require('../config/encryption.js');

module.exports = {
  index: function(req, res) {
    res.render('pages/index', {
      message: req.session.message
    });
    req.session.message = null;
    console.log("Index page load");
  },

  login: function(req, res) {
    knex('users')
      .where('email', req.body.email)
      .then((result) => {
        let user = result[0];
        if (user) {
          encryption.check(user, req.body)
            .then((isValid) => {
              if (isValid) {
                req.session.user = user.id;
                res.redirect('/trips');
              } else {
                req.session.message = "You entered an incorrect email or password.";
                res.redirect('/');
              }
            })
        } else {
          req.session.message = "You entered an incorrect email or password."
          res.redirect('/');
        }
      }).catch((err) => {
        req.session.message = "You broke our webpage. Try again, nicely this time."
        res.redirect('/');
      });
  },

  logout: function(req, res) {
    req.session.user = null;
    res.redirect('/');
    console.log("User logout");
  },

  registration: function(req, res) {
    res.render("pages/register", {
      message: req.session.message
    });
    req.session.message = null;
    console.log("User registration load");
  },

  register: function(req, res) {
    encryption.hash(req.body).then((encryptedUser) => {
      // take the encrypted user and insert them into the db.
      knex('users')
        .insert({
          name: encryptedUser.name,
          email: encryptedUser.email,
          password: encryptedUser.password
        })
        .then(() => {
          req.session.message = "You have successfully registered! Please log in.";
          res.redirect('/');
        })
        .catch(() => {
          req.session.message = "You entered invalid data. Please register again."
          res.redirect('/register');
        })
    });
  },
}
