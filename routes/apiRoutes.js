var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  app.post("/api/login",/* passport.authenticate("local"),*/ function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/index");
  })

  //============== CODE PROVIDED FOR US BY PROJECT ===================
  // Get bank account details
  app.get("/api/bankaccount/:id", function(req, res) {
   
    db.CustomerBankAcct.findOne({
      where: {
        CustomerId: req.params.id
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


// Get Stock price Daily details
app.get("/api/stockDailyJSON/:symbol", function(req, res) {
   
  db.Stock.findAll({
    where: {
      symbol: "MSFT"
    }
  }).then(function(dbStockDaily) {
    // console.log(dbStockDaily.length);
    var finalArr  =[];
    // var jsonFormt = JSON.stringify(dbStockDaily);
  
    for(var i=0 ; i< dbStockDaily.length; i++)
    {
      // var d = new Date(dbStockDaily[i].timestamps);
      // var timedate = d.getFullYear()+("00"+d.getMonth()).slice(-2)+("00"+d.getDate()).slice(-2);
       var subArr = {
        // x: new Date(
				// 	parseInt(dbStockDaily[i].timestamps.split("-")[0]),
				// 	parseInt(dbStockDaily[i].timestamps.split("-")[1]),
				// 	parseInt(dbStockDaily[i].timestamps.split("-")[2])
				// ),
       
        x :  Number(dbStockDaily[i].timestamps),
        y: [ parseFloat(dbStockDaily[i].open),
             parseFloat(dbStockDaily[i].high),
             parseFloat(dbStockDaily[i].low),
             parseFloat(dbStockDaily[i].close)
        ] 

        }
    finalArr.push(subArr);
    }
    //  console.log(finalArr);
     res.send(finalArr);
  });
});

// save transfer amount in database
app.post("/api/transfer", function(req, res) {
  console.log(req.body, "req.body*****transfer***");
  db.Transfer.create(req.body).then(function(dbTransfer) {
    res.status(200).end();
  });
});


// save customer bank acct in database
app.post("/api/setupacct", function(req, res) {
  console.log(req.body, "req.body**setupacct******");
  db.CustomerBankAcct.create(req.body).then(function(dbCustomerBankAcct) {
    res.status(200).end();
  });
});

//available cash : acct balance
app.get("/api/vw_CustomerBalance/:id", function(req, res) {
  console.log(req.body, "req.body****vw_CustomerBalance****");
  db.Transfer.sum('creditAmount', { where: { CustomerId: req.params.id } })  
  .then(function(dbTransfer) {
    res.json(dbTransfer);   
  });


});

app.get("/api/seachBySymbol/:symbol", function(req, res) {
   
  var stockTime ;
  db.Stock.max('timestamps', { where: { symbol: req.params.symbol } })  
  .then(function(dbStocktime) {
    stockTime = dbStocktime;
   
    console.log(stockTime);
    db.Stock.findOne({
      where: {
        timestamps: dbStocktime,
        symbol:req.params.symbol
      }
    }).then(function(dbStockPrice) {
      res.json(dbStockPrice);
    });
    // res.json(dbStocktime);   
  });
  
  
});



  // Create a new example
  app.post("/api/order", function(req, res) {
    db.Transaction.create(req.body).then(function(dbTransction) {
      res.status(200).end();
   
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

  //======================= PASSPORT ==============================
  // Using the passport.authenticate middleware with our local strategy. If user has valid login
  // credentials, send them to the members page, otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't redirect that post into a GET request, so
    // send user back the route to the members page because the redirect will happen on the front end.
    // They won't get this or even be able to access this page if they aren't authorized
    res.json("/members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
