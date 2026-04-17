module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      brand: DataTypes.STRING,
      productName: DataTypes.STRING,
      description: DataTypes.TEXT
    },
    {
      tableName: 'products',
      paranoid:true
    }
  );
  Product.associate = models => {
    Product.belongsTo(models.User, {
      foreignKey: 'admin_id'
    });

    Product.belongsTo(models.Category, {
      foreignKey: 'category_id'
    });

    Product.hasMany(models.ProductVariant, {
      foreignKey: 'product_id',
      onDelete: 'CASCADE'
    });
  };

  return Product;
};