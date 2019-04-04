module.exports = function (sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 150]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 10]
      }
    },
  });

  Customer.associate = function (models) {
    Customer.hasMany(models.Transactions, {
    });
  };
  return Customer;
};
