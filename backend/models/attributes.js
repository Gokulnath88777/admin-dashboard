module.exports = (sequelize, DataTypes) => {
  const Attribute = sequelize.define('Attribute', {
    name: DataTypes.STRING
  }, {
    tableName: 'attributes'
  });

  Attribute.associate = models => {
    Attribute.hasMany(models.AttributeValue, {
      foreignKey: 'attribute_id'
    });
  };

  return Attribute;
};