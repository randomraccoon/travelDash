const knex = require("../db/knex.js");
const encryption = require('../config/encryption.js');

module.exports = {
  index: function(req, res) {
    let message = {message: req.session.message};
    req.session.message = null;
    req.session.save(err=>{
      res.render('pages/index', message);
      console.log("Index page load");
    });
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
                req.session.save(err=>{
                  res.redirect('/');
                });
              }
            })
        } else {
          req.session.message = "You entered an incorrect email or password."
          req.session.save(err=>{
            res.redirect('/');
          });
        }
      }).catch((err) => {
        req.session.message = "You broke our webpage. Try again, nicely this time."
        req.session.save(err=>{
          res.redirect('/');
        });
      });
  },

  logout: function(req, res) {
    req.session.user = null;
    req.session.save(err=>{
      res.redirect('/');
      console.log("User logout");
    });
  },

  registration: function(req, res) {
    let message = {message: req.session.message};
    req.session.message = null;
    req.session.save(err=>{
      res.render("pages/register", message);
      console.log("User registration load");
    });
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
          req.session.save(err=>{
            res.redirect('/');
          });
        })
        .catch(() => {
          req.session.message = "You entered invalid data. Please register again."
          req.session.save(err=>{
            res.redirect('/register');
          });
        })
    });
  },
}
