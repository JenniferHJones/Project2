module.exports = function (sequelize, DataTypes) {
    var Stocks = sequelize.define("Stocks", {
        symbol: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTIGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTIGER,
            allowNull: false,
        }
    });
    Stocks.associate = function (models) {
        Stocks.belongsTo(models.Customer, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Stocks;
};