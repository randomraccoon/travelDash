const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

require('./config/session.js')(app);

app.set('view engine', 'ejs');

var routes_setter = require('./config/routes.js');
routes_setter(app);

app.listen(port, function() {
  console.log('Listening on', port);
});

//view version on command linbe by copy and pasting the code below.  
//export PS1="\\w:\$(git branch 2>/dev/null | grep '^*' | colrm 1 2)\$ "
