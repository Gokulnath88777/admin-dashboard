

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    image_url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'images',
          paranoid:true

  });

  Image.associate = models => {
    Image.belongsTo(models.ProductVariant, {
      foreignKey: 'variant_id'
    });
  };

  return Image;
};