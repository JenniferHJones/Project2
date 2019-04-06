module.exports = function (sequelize, DataTypes) {
    var Stocks = sequelize.define("Stock", {
        symbol: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // timezone: {
        //     type: DataTypes.TIMEZONE,
        //     allowNull: false,
        // },
        // timestamp: {
        //     type: DataTypes.TIMESTAMP,
        //     allowNull: false,
        // },
        openprice: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        highprice: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        lowprice: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        highprice: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        closeprice: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        volume: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
      
    });
    return Stocks;
};