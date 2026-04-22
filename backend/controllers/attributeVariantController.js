const { AttributeVariant } = require("../models");
  const joinAttributes = async (req, res) => {
    try {
      const { variant_id, attribute_value_ids } = req.body;
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
      const result = await AttributeVariant.bulkCreate(data, {
        ignoreDuplicates: true
      });

      res.status(201).json({
        message: "Attributes linked successfully",
        result
      });

    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Server Error"
      });
    }
  };

module.exports = joinAttributes;