module.exports = function (sequelize, DataTypes) {
    var CustomerBankAcct = sequelize.define("CustomerBankAcct", {

        bankName: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        bankAcctNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1, 12]
              }

        },
        billingAddress: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        zip: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [5]
              }

        },
        // createdAt: {
        //     type: DataTypes.DATE(3),
        //     defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
        //     field: 'created_at',
        //   },
        //   updatedAt: {
        //     type: DataTypes.DATE(3),
        //     defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
        //     field: 'updated_at',
        //   },

    });
    CustomerBankAcct.associate = function(models) {
        // We're saying that a transaction should belong to an Customer
        // A transaction can't be created without a customer due to the foreign key constraint
        CustomerBankAcct.belongsTo(models.Customer, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return CustomerBankAcct;
};