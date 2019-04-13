var db = require("../models");
var passport = require("../config/passport");
var regAuth = require("../config/middleware/registerAuth");
var keys = require("../keys");

module.exports = function (app) {

  app.get("/api/market/:id", function (req, res) {
    // db.Stock.findById(1).then(function(d){console.log(d)})
    db.Transaction.findAll({
      where: {
        customerId: req.params.id
      },
    }).then(function (dbTransData) {
      Promise.all(dbTransData.map(function (trans) {
        // console.log(trans.symbol)
        return db.Stock.findOne({
          where: {
            symbol: trans.symbol.toUpperCase(),
          },
        })
      })).then(function (stocks) {
        var newarray = dbTransData.map(function (d, index) {
          d.symbol = stocks[index]
          return d
        })
        return res.json(newarray)
      })
    });
  });

  // API routes - Requires the newsapi package and News API Key
  var NewsAPI = require('newsapi');
  var newsapi = new NewsAPI(keys.news.code);
  
  // This get returns the top business headlines 
  app.get("/api/newsData", function (req, res) {
    newsapi.v2.topHeadlines({
      category: 'business',
      language: 'en',
      country: 'us'
    }).then(response => {
      // console.log(response);
      res.json(response);
    });
  });
  // This post sends inputSearchValue to the newsapi and returns data on search value
  app.post("/api/newsData", function (req, res) {
    // console.log("Sohail's Body", req.body);
    newsapi.v2.everything({
      q: req.body.stockName,
      sortBy: 'relevancy',
      page: 2
    }).then(response => {
      // console.log("This is Sohail's", response);
      res.json(response);
    });
  });

  // Get order history
  app.get("/api/transactions/", function (req, res) {
    // console.log("Current User ID:", req.query.currentUser);

    db.Transaction.findAll({
      where: {
        CustomerID: req.query.currentUser
      }
    }).then(function (dbTransaction) {
      // console.log("received return", dbTransaction);
      res.json(dbTransaction);
    });
  })

  // Save customer bank acct in database
  app.post("/api/setupacct", function (req, res) {
    // console.log(req.body, "req.body**setupacct******");
    db.CustomerBankAcct.create(req.body).then(function (dbCustomerBankAcct) {
      res.status(200).end();
    });
  });

  // Get bank account details
  app.get("/api/bankaccount/:CustomerId", function (req, res) {

    db.CustomerBankAcct.findOne({
      where: {
        CustomerId: req.params.CustomerId
      }
    }).then(function (dbCustomerBankAcct) {
      res.json(dbCustomerBankAcct);
    });
  });

  // Get trading account details
  app.get("/api/tfyaccounts/:CustomerId", function (req, res) {

    db.Customer.findOne({
      where: {
        id: req.params.CustomerId
      }
    }).then(function (dbCustomer) {
      res.json(dbCustomer);
    })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });

  // Available cash : acct balance
  app.get("/api/vw_CustomerBalance/:CustomerId", function (req, res) {
    // console.log(req.body, "req.body****vw_CustomerBalance****");
    db.Transfer.sum('creditAmount', { where: { CustomerId: req.params.CustomerId } })
      .then(function (dbTransfer) {
        res.json(dbTransfer);
      });
  });

  // Get Stock price Daily details
  app.get("/api/stockDailyJSON/:symbol", function (req, res) {

    db.Stock.findAll({
      where: {
        symbol: req.params.symbol
      }
    }).then(function (dbStockDaily) {
      // console.log(dbStockDaily.length);
      var finalArr = [];
      // var jsonFormt = JSON.stringify(dbStockDaily);

      for (var i = 0; i < dbStockDaily.length; i++) {
        var subArr = {

          x: Number(dbStockDaily[i].timestamps),
          y: [parseFloat(dbStockDaily[i].open),
          parseFloat(dbStockDaily[i].high),
          parseFloat(dbStockDaily[i].low),
          parseFloat(dbStockDaily[i].close)
          ]
        }
        finalArr.push(subArr);
      }
      res.send(finalArr);
    });
  });

  // Save transfer amount in database
  app.post("/api/transfer", function (req, res) {
    // console.log(req.body, "req.body*****transfer***");
    db.Transfer.create(req.body).then(function (dbTransfer) {
      res.status(200).end();
    });
  });

  app.get("/api/seachBySymbol/:symbol", function (req, res) {
    var stockTime;
    db.Stock.max('timestamps', { where: { symbol: req.params.symbol } })
      .then(function (dbStocktime) {
        stockTime = dbStocktime;

        // console.log(stockTime);
        db.Stock.findOne({
          where: {
            timestamps: dbStocktime,
            symbol: req.params.symbol
          }
        }).then(function (dbStockPrice) {
          res.json(dbStockPrice);
        });
      });
  });

  // Save transfer amount in database
  app.get("/api/transfer", function (req, res) {
    // console.log(req.body, "req.body********");

    db.Transfer.findAll({

      attributes: ['creditAmount', 'debitAmount'],
      where: {
        CustomerId: req.params.CustomerId
      }
    }).then(function (dbTransfer) {
      res.json(dbTransfer);
    });
  });

  // Save transfer amount in database
  app.post("/api/transfer", function (req, res) {
    // console.log(req.body, "req.body********");
    db.Transfer.create(req.body).then(function (dbTransfer) {
      res.status(200).end();

    });
    // res.json(dbStocktime);   
  });

  // Create a new order
  app.post("/api/order", function (req, res) {
    // console.log(req.body, "req.body***Order*****");
    db.Transaction.create(req.body).then(function (dbTransaction) {
      res.status(200).end();

    });
  });

  // Get stock quantity for customer and symbol
  app.get("/api/stockquantity/:CustomerId/:symbol", function (req, res) {
    //console.log(req);
    db.Transaction.sum('quantity', {
      where: {
        CustomerId: req.params.CustomerId,
        symbol: req.params.symbol
      }
    }
    ).then(function (dbTransaction) {
      res.json(dbTransaction);
    });
  });

  // Save transfer amount in database
  app.post("/api/setupacct", function (req, res) {
    // console.log(req.body, "req.body********");
    db.CustomerBankAcct.create(req.body).then(function (dbCustomerBankAcct) {
      res.status(200).end();
    });
  });

  //======================= PASSPORT ==============================
  // Using the passport.authenticate middleware with our local strategy. If customer has valid login
  // credentials, send them to the market page, otherwise the customer will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // console.log("request body", req.body);
    // console.log("request user", req.user);

    // Since we're doing a POST with javascript, we can't redirect that post into a GET request, so
    // send customer back the route to the sign in page because the redirect will happen on the front end.
    // They won't be able to access this page if they aren't authorized

    // res.json("/market");
    res.json({
      URL: "/market",
      userID: req.user.id
    });

  });

  // Route for registering a customer. The customer's password is automatically hashed and stored securely thanks to
  // how we configured the Sequelize Customer Model. If the customer is created successfully, proceed to log the customer in,
  // otherwise send back an error
  app.post("/api/register", regAuth, function (req, res) {
    // Create random alphanumeric value with 8 characters
    var tradeAcctVal = [...Array(8)].map(i => (~~(Math.random() * 36)).toString(36)).join('');
    // Adds TFY prefix to value
    var tradeAcct = "TFY" + tradeAcctVal;

    // console.log("this is the request.body", req.body);
    db.Customer.create({
      fName: req.body.name,
      tradeAcct: tradeAcct,
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.send("Success");
      })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });

  // Route for logging customer out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about customer to be used client side
  app.get("/api/customer_data", function (req, res) {
    if (!req.customer) {
      // If customer is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back customer's name, email, and id
      res.json({
        name: req.customer.name,
        tradeAcct: tradeAcct,
        email: req.customer.email,
        id: req.customer.id
      });
    }
  });
}