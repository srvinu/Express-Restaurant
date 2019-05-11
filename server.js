// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var reserveTable = [
  {
    routeName: "kang",
    name: "Kang",
    email: 'kang@yo.com',
    phone: 1111111111
  },
  {
    routeName: "rachel",
    name: "Rachel",
    email: 'rachel@yo.com',
    phone: 2222222222
  },
  {
    routeName: "dan",
    name: "Dan",
    email: 'dan@yo.com',
    phone: 3333333333
  },

];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});
app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});
app.get("/viewTable", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});
// Displays a single character, or returns false
app.get("/api/reserve/:reserve-name", function(req, res) {
  var chosen = req.params.reserve-name;
  console.log(chosen);
  for (var i = 0; i < reserveTable.length; i++) {
    if (chosen === reserveTable[i].name) {
      return res.json(reserveTable[i]);
    }
  }
  return res.json(false);
});
// Displays all characters
app.get("/api/reserve", function(req, res) {
  return res.json(reserveTable);
});
// Create New Characters - takes in JSON input
app.post("/api/reserve", function(req, res) {
  var newReserve = req.body;
  newReserve.routeName = newReserve.name.replace(/\s+/g, "").toLowerCase();
  console.log(newReserve);
  reserveTable.push(newReserve);
  res.json(newReserve);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
