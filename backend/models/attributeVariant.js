module.exports = (sequelize, DataTypes) => {
  const AttributeVariant = sequelize.define('AttributeVariant', {
    variant_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attribute_value_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

  }, {
    timestamps: true,
    tableName: 'attribute_variants',


  });

  return AttributeVariant;
};