const { ProductVariant, AttributeVariant } = require('../models');
const attributeValue = require('../models/attributeValue');

const createVariant = async (req, res) => {
  try {
    console.log("Create Variant")
    const {

      product_id, sku_code, price, discount, stock, attribute_value_ids } = req.body;

    if (!product_id || !sku_code || !price || !stock ||
       !Array.isArray(attribute_value_ids)
    ) {
      return res.status(400).json({ message: "Required fields missing" });
    }
    const variant = await ProductVariant.create({
      product_id,
      sku_code,
      price,
      discount,
      quantity: stock
    });
    const data = attribute_value_ids.map(value_id => ({
      variant_id: variant.id,
      attribute_value_id: value_id,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    const result = await AttributeVariant.bulkCreate(data, {
      ignoreDuplicates: true
    });
    res.status(201).json({
      message: "Variant created successfully",
      data: variant,
      result
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
const joinAttributes = async (req, res) => {
  try {
    const { variant_id, } = req.body;
    if (!variant_id || !Array.isArray(attribute_value_ids)) {
      return res.status(400).json({
        message1: "Field is Required",
        message2: "Attribute value should be in array"
      });
    }
    const data = attribute_value_ids.map(value_id => ({
      variant_id,
      attribute_value_id: value_id,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    res.status(201).json({
      message: "Attributes linked successfully",

    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

const getVariants = async (req, res) => {
  try {
    const data = await ProductVariant.findAll();

    res.status(200).json({
      message: "Variants fetched successfully",
      data
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createVariant, getVariants }

