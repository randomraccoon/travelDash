const main = require("../controllers/main.js");
const trips = require("../controllers/trips.js");

module.exports = function(app){

  app.get('/', main.index);

  app.post('/login', main.login);

  app.get('/logout', main.logout);

  app.get('/register', main.registration);

  app.post('/register', main.register);

  app.get('/trips', trips.viewAll);

}
