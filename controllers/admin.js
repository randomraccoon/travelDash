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
    res.render('pages/admin', {message: req.session.message});
    req.session.message = null;
    console.log("Admin load");
  }
};
