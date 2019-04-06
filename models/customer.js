module.exports = function (sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    
    fullName: {
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

  Customer.associate = function(models) {
    Customer.hasMany(models.Transaction);
  };
  return Customer;
};
