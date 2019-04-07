var db = require("../models");
var passport = require("../config/passport");
var regAuth = require("../config/middleware/registerAuth");

module.exports = function(app) {

  // Get bank account details
  app.get("/api/bankaccount/:id", function(req, res) {
   
    db.CustomerBankAcct.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbCustomerBankAcct) {
      res.json(dbCustomerBankAcct);
    });
});

// Get trading account details
app.get("/api/tfyaccounts/:id", function(req, res) {
   
  db.Customer.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(dbCustomer) {
    res.json(dbCustomer);
  });
});

// save transfer amount in database
app.get("/api/transfer", function(req, res) {
  console.log(req.body, "req.body********");

  db.Transfer.findAll({

    attributes: ['creditAmount' , 'debitAmount'],
    where: {
      CustomerId: req.params.CustomerId
    }
  }).then(function(dbTransfer) {
    res.json(dbTransfer);
  });
});

// save transfer amount in database
app.post("/api/transfer", function(req, res) {
  console.log(req.body, "req.body********");
  db.Transfer.create(req.body).then(function(dbTransfer) {
    res.status(200).end();
  });
});

// save transfer amount in database
app.post("/api/setupacct", function(req, res) {
  console.log(req.body, "req.body********");
  db.CustomerBankAcct.create(req.body).then(function(dbCustomerBankAcct) {
    res.status(200).end();
  });
});

//======================= PASSPORT ==============================
  // Using the passport.authenticate middleware with our local strategy. If customer has valid login
  // credentials, send them to the market page, otherwise the customer will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    console.log("request body", req.body);
    // Since we're doing a POST with javascript, we can't redirect that post into a GET request, so
    // send customer back the route to the sign in page because the redirect will happen on the front end.
    // They won't be able to access this page if they aren't authorized
    res.json("/market");
  });

  // Route for registering a customer. The customer's password is automatically hashed and stored securely thanks to
  // how we configured the Sequelize Customer Model. If the customer is created successfully, proceed to log the customer in,
  // otherwise send back an error
  app.post("/api/register", regAuth, function (req, res) {
    console.log("this is the request.body", req.body);
    db.Customer.create({
      fName: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    .then(function () {
      res.send("Success");
    })
      .catch(function (err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });

  // Route for logging customer out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our customer to be used client side
  app.get("/api/customer_data", function (req, res) {
    if (!req.customer) {
      // If the customer is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the customer's name, email, and id
      res.json({
        name: req.customer.name,
        email: req.customer.email,
        id: req.customer.id
      });
    }
  });
  
  //============== CODE PROVIDED FOR US BY PROJECT ===================
  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
}
