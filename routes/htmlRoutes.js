var db = require("../models");
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/market", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/market.html"));
  });

  //======================= PASSPORT ==============================

  // Here we add the isAuthenticated middleware to this route. If a customer who is not logged in
  // tries to access this route they will be redirected to the index page
  app.get("/market", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  //============== CODE PROVIDED FOR US BY PROJECT ===================
  
  // Load index page
  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });
  
  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.send("404");
  });
};
