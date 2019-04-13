var db = require("../models");
var path = require("path");
var keys = require("../keys");


// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/prices", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/prices.html"));
  });

  app.get("/symbol", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/symbol.html"));
  });

  //======================= PASSPORT ==============================

  // Here we add the isAuthenticated middleware to this route. If a customer who is not logged in
  // tries to access this route they will be redirected to the index page
  app.get("/market", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/market.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.send("404");
  });
};
