module.exports = (sequelize, DataTypes) => {
    const ProductVariant = sequelize.define('ProductVariant', {
        sku_code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        price: DataTypes.INTEGER,
        discount: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER
    }, {
        tableName: 'product_variants'
    });

    ProductVariant.associate = models => {

        ProductVariant.belongsTo(models.Product, {
            foreignKey: 'product_id'
        });

        ProductVariant.hasMany(models.Image, {
            foreignKey: 'variant_id'
        });

        ProductVariant.belongsToMany(models.AttributeValue, {
            through: {
                model: models.AttributeVariant
            },
            foreignKey: 'variant_id',
            otherKey: 'attribute_value_id'
        });

    };

    return ProductVariant;
};