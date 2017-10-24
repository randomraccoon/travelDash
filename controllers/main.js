const knex = require("../db/knex.js");

module.exports = {
  index: function(req, res) {
    res.render('pages/index');
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
      })
  }
}
