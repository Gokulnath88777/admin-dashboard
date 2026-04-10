const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
);

const db = {};

db.User = require("./users")(sequelize, DataTypes);
db.Product = require("./products")(sequelize, DataTypes);
db.Category=require("./categories")(sequelize,DataTypes)
db.ProductVariant=require("./productVariant")(sequelize,DataTypes)
db.Image=require("./image")(sequelize,DataTypes)
db.Attribute=require('./attributes')(sequelize,DataTypes)
db.AttributeValue=require('./attributeValue')(sequelize,DataTypes)
db.AttributeVariant=require('./attributeVariant')(sequelize,DataTypes)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;