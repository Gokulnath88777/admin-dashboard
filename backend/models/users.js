const { DataTypes } = require("sequelize");



module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
   
    email:
    { 
      type:DataTypes.STRING,
      unique:true,
      allowNull:false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      default:'user',
      allowNull: false
    }
  }, {
    tableName: 'users'
  });

  User.associate = models=> {
    User.hasMany(models.Product, { foreignKey: 'admin_id' });
  };

  return User;
};