module.exports = function(sequelize, DataTypes){
  var Transactions = sequelize.define("Transaction", {
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    }
  });
  Transactions.associate = function (models) {
    Transactions.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false,
      }
    });
  };

  return Transactions;
};