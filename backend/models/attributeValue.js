const { DataTypes } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  const AttributeValue = sequelize.define('AttributeValue', {
    value: DataTypes.STRING
  }, {
    tableName: 'attribute_values'
  });

  AttributeValue.associate = models => {
    AttributeValue.belongsTo(models.Attribute, {
      foreignKey: 'attribute_id'
    });

    AttributeValue.belongsToMany(models.ProductVariant, {
      through: models.AttributeVariant,
      foreignKey: 'attribute_value_id'
    });
  };

  return AttributeValue;
};