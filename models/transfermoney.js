/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var Transfer = sequelize.define("Transfer", {
    creditAmount: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
    debitAmount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    transfer_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
  Transfer.associate = function(models) {
    // We're saying that a transaction should belong to an Customer
    // A transaction can't be created without a customer due to the foreign key constraint
    Transfer.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Transfer;
};
