const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  const AttributeVariant = sequelize.define(
    'AttributeVariant',
    {},
    {
      tableName: 'attribute_variants'
    }
  );

  return AttributeVariant;
};