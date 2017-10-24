const main = require("../controllers/main.js");
const trips = require("../controllers/trips.js");

module.exports = function(app){

  app.get('/', main.index);

  app.post('/login', main.login);

  app.get('/logout', main.logout);

  app.get('/register', main.registration);

  app.post('/register', main.register);

  app.use(userAuth);

  app.get('/trips', trips.viewAll);

  function userAuth(req, res, next){
    if(req.session.user || req.session.admin){
      next();
    }else{
      res.redirect("/users/login")
    }
  }

  function adminAuth(req,res,next){
    if(req.session.admin){
      next();
    }else{
      res.redirect('/login');
    }
  }
}
