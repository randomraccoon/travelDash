const main = require("../controllers/main.js")
module.exports = function(app){

  app.get('/', main.index);

}
