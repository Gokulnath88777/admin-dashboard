const { DataTypes } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    brand: DataTypes.STRING,
    productName: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    tableName: 'products'
  });

  Product.associate = models => {
    Product.belongsTo(models.User, { foreignKey: 'admin_id' });
    Product.belongsTo(models.Category, { foreignKey: 'category_id' });

    Product.hasMany(models.ProductVariant, {
      foreignKey: 'product_id'
    });
  };

  return Product;
};