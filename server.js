/*
Here is where you set up your server file.
express middleware.
*/
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override'); // for deletes in express

// Our model controllers (rather than routes)
var application_controller = require('./controllers/application_controller');
var burgers_controller = require('./controllers/burgers_controller');

// we bring in the models we exported with index.js
var models = require("./models");

// instantiate our app
var app = express();

// override POST to have DELETE and PUT
app.use(methodOverride('_method'));

//set up handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}));

//indicates what controller should be use when this route is hit
app.use('/', application_controller);
app.use('/burgers', burgers_controller);

// we set the port of the app
app.set('port', process.env.PORT || 3000);

// we sync the models with our db 
// (thus creating the apropos tables)
models.sequelize.sync({force:true}).then(function () {
	// set our app to listen to the port we set above
  var server = app.listen(app.get('port'), function() {
  	// then display the listening port.
    console.log('Express server listening on port ' + server.address().port);
  });
});
