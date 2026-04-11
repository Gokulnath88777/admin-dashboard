const { ProductVariant } = require('../models');

const createVariant = async (req, res) => {
  try {
    console.log("Create Variant")
    const {
      product_id,sku_code,price,discount,stock } = req.body;

    if (!product_id || !sku_code || !price || !stock) {
      return res.status(400).json({ message: "Required fields missing" });
    }
    const variant = await ProductVariant.create({
      product_id,
      sku_code,
      price,
      discount,
      quantity:stock
    });
    res.status(201).json({
      message: "Variant created successfully",
      data: variant
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
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

module.exports={createVariant,getVariants}

