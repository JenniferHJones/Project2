module.exports = function (sequelize, DataTypes) {
    var Stocks = sequelize.define
    ("Stock", {
        symbol: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // timezone: {
        //     type: DataTypes.TIMEZONE,
        //     allowNull: false,
        // },
        //ID,"timestamp,"open","high","low","close","volume","Symbol"
        timestamps: {
             type: DataTypes.DATE(3),
              allowNull: true,
         },
        open: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        high: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        low: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        close: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        volume: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
       createdAt: {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
      field: 'createdAt',
    },
    updatedAt: {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
      field: 'updatedAt',
    },
    }
    );
    return Stocks;
};