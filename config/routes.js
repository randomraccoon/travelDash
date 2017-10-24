const main = require("../controllers/main.js")
module.exports = function(app){

  app.get('/', main.index);

  app.post('/login', main.login);

  app.post('/register', main.register);

  

}
