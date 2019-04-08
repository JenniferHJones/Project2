// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
var bcrypt = require("bcrypt-nodejs");

module.exports = function (sequelize, DataTypes) {
  
 
  var Customer = sequelize.define("Customer", {
    
    fName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40]
      }
    },
    tradeAcct: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    },
    // createdAt: {
    //   type: DataTypes.DATE(3),
    //   defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
    //   field: 'created_at',
    // },
    // updatedAt: {
    //   type: DataTypes.DATE(3),
    //   defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
    //   field: 'updated_at',
    // },
  });

  // Creating a custom method for our Customer model to check if an unhashed password was entered by the user 
  // can be compared to the hashed password stored in the database
  Customer.prototype.validPassword = function(password) {
    console.log("testing password", password);
    var passed = bcrypt.compareSync(password, this.password);
    console.log("bcrypt result",passed);
    return passed;
  };
  // Hooks are automatic methods that run during various phases of the Customer Model lifecycle
  // Before a Customer is created, we automatically hash their password
  Customer.hook("beforeCreate", function(customer) {
    
    console.log("customer", customer);
    customer.password = bcrypt.hashSync(customer.password, bcrypt.genSaltSync(10), null);
  });

  Customer.associate = function(models) {
    Customer.hasMany(models.Transaction);
  };
  return Customer;
};
