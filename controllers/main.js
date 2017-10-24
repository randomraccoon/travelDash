const knex = require("../db/knex.js");
const encryption = require('../config/encryption.js')

module.exports = {
  index: function(req, res) {
    res.render('pages/index', {message: req.session.message});
  },

  login: function(req, res) {
    knex('users')
      .where('email', req.body.email)
      .then((result)=>{

        let user = result[0];

        encryption.check(user, req.body).then((isValid)=>{
          console.log(isValid);
          console.log(user.email);
          if(isValid){
            req.session.user = user.id;
            res.redirect('/trips');
          }else{
            req.session.message = "You entered a invalid username or password.";
            res.redirect('/');
          }
        })
      })
      .catch((err)=>{
        req.session.message = "You entered a invalid username or password."
        res.redirect('/')
      });
  },

  registration: function(req, res) {
    res.render("pages/register", {message: req.session.message});
  },

  register: function(req, res) {
    encryption.hash(req.body).then((encryptedUser)=>{
      // take the encrypted user and insert them into the db.
      knex('users')
        .insert(encryptedUser)
        .then(()=>{
          req.session.message = "You have successfully registered! Please log in.";
          res.redirect('/');
        })
        .catch(()=>{
          req.session.message = "You entered invalid data. Please register again."
          res.redirect('/register');
        })
    });
  },
}
