

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'categories'
  });

  Category.associate = models => {
    Category.hasMany(models.Product, {
      foreignKey: 'category_id',
      onDelete: 'SET NULL'
    });
  };

  return Category;
};