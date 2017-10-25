const main = require("../controllers/main.js");
const trips = require("../controllers/trips.js");
const flights = require("../controllers/flights.js");

module.exports = function(app){

  app.get('/', main.index);

  app.post('/login', main.login);

  app.get('/logout', main.logout);

  app.get('/register', main.registration);

  app.post('/register', main.register);

  app.get('/airlines/login', flights.renderLogin);

  app.post('/airlines/login', flights.login);

  app.use(userAuth);

  app.get('/trips', trips.viewAll);

  app.post('/trips', trips.create);

  app.use(adminAuth);

  app.get('/airlines/logout', flights.logout);

  app.get('/airlines', flights.viewAll);

  app.post('/airlines', flights.create);

  function userAuth(req, res, next){
    if(req.session.user || req.session.airline){
      next();
    }else{
      res.redirect("/login")
    }
  }

  function adminAuth(req,res,next){
    if(req.session.airline){
      next();
    }else{
      res.redirect('/airlines/login');
    }
  }
}
