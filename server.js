// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// ******************************************************************************
/* var pubnub = require('pubnub')({
  publish_key: 'pub-c-502ba2b2-a64f-41f7-9607-2c6b371f0460',
  subscribe_key: 'sub-c-fb9f7ab4-83d1-11e8-b9aa-969f058f0c4c'
});

var channel = ['eon-chart'];

var temp = 0;

function publish() {
  var data = { eon: {
    'temperature': temp,
  }};
  pubnub.publish({
    channel: channel,
    message: data,
  });
}

// Johnny-Five 
// Using a temperature sensor, type LM35

var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
 var temperature = new five.Thermometer({
   controller: "LM35",
   pin: "A0"
 });

 //Temperature data control block
 temperature.on("change", function() {
 //console.log(this.celsius + "°C", this.fahrenheit + "°F");
 });

  setInterval(publish, 3000);
}); */


// ******************************************************************************
// Sets up the Express App


// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/apiRoutes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});