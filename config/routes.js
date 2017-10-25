const main = require("../controllers/main.js");
const trips = require("../controllers/trips.js");
const flights = require("../controllers/flights.js");
const admin = require("../controllers/admin.js");

module.exports = function(app){

  app.get('/', main.index);

  app.post('/login', main.login);

  app.get('/logout', main.logout);

  app.get('/register', main.registration);

  app.post('/register', main.register);

  app.get('/airlines/login', flights.renderLogin);

  app.post('/airlines/login', flights.login);

  app.get('/admin/login', admin.renderLogin);

  app.post('/admin/login', admin.login);

  app.use(userAuth);

  app.get('/trips', trips.viewAll);

  app.post('/trips', trips.create);

  app.use(airlineAuth);

  app.get('/airlines/logout', flights.logout);

  app.get('/airlines', flights.viewAll);

  app.post('/airlines', flights.create);

  app.use(adminAuth);

  app.get('/admin', admin.index);

  app.get('/admin/logout', admin.logout);


  function userAuth(req, res, next){
    if(req.session.user || req.session.airline || req.session.admin){
      next();
    }else{
      res.redirect("/login")
    }
  }

  function airlineAuth(req,res,next){
    if(req.session.airline || req.session.admin){
      next();
    }else {
      res.redirect('/airlines/login');
    }
  }

  function adminAuth(req,res,next){
    if(req.session.admin){
      next();
    }else{
      res.redirect('/admin/login');
    }
  }
}
