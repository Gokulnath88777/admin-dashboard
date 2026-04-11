module.exports = (sequelize, DataTypes) => {
  const AttributeValue = sequelize.define(
    'AttributeValue',
    {
      attribute_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'attribute_values'
    }
  );
  AttributeValue.associate = models => {

    AttributeValue.belongsTo(models.Attribute, {
      foreignKey: 'attribute_id'
    });
    AttributeValue.belongsToMany(models.ProductVariant, {
      through: models.AttributeVariant,
      foreignKey: 'attribute_value_id',
      otherKey: 'variant_id'
    });
  };

  return AttributeValue;
};