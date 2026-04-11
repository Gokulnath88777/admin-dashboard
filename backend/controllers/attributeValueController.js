const { Attribute, AttributeValue } = require("../models");

const createValue = async (req, res) => {
    try {
        const { attribute_id, value } = req.body;
        if (!attribute_id || !value) {
            return res.status(400).json(
                {
                    message: "Field is required"
                })
        }
        const attribute = await Attribute.findByPk(attribute_id)
        if (!attribute) {
            return res.status(404).json(
                {
                    message: "Attribute not found"
                }
            )
        }
        const attributeValue = await AttributeValue.create(
            {
                attribute_id,
                value
            }
        )
        res.status(200).json(
            {
                message: "Attribute value created successfully",
                attributeValue
            })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).json(
            {
                message: "Something went wrong"
            }
        )
    }
}
module.exports = { createValue }