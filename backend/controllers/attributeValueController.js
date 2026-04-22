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
        res.status(201).json(
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
const getValue = async (req, res) => {
    try {

        const { id } = req.params
        if (!id) {
            return res.status(400).json(
                {
                    message: "Field is required"
                })
        }
        const attribute = await Attribute.findByPk(id)
        const name = attribute.name
        const values = await AttributeValue.findAll(
            {
                where: { attribute_id: id }
            }

        )

        res.status(200).json(
            {
                name,
                values,
                message: 'Values get successfully'
            }
        )
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json(
            {
                message: "Something went wrong"
            }
        )
    }

}


const editAttributeValue = async (req, res) => {
    try {

        const { id } = req.params
        const { updatedName } = req.body
        const attributeValue = await AttributeValue.findByPk(id)
        console.log(attributeValue);
        if (!attributeValue) {

            return res.status(404).json(
                {
                    attributeValue,
                    message: "Not found"
                }
            )
        }
        const data = await AttributeValue.update({ value: updatedName }, { where: { id } })
        res.status(200).json(
            {
                message: "Data Updated Successfully"
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
const deleteAttributeValue = async (req, res) => {

    try {
        const { id } = req.params;
        const deleted = await AttributeValue.destroy({
            where: { id }
        })
        if (!deleted) {
            return res.status(404).json(
                {
                    message: "Not found"
                }
            )
        }
        res.status(200).json(
            {
                message: "AttributeValue deleted successfully"
            }
        )
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
const getValuesByAttributes = async (req, res) => {
    try {

        const { ids } = req.query;
        console.log(req.query);
        console.log("ids" , ids);

        if (!ids) {
            return res.status(400).json({
                message: "Attribute id required"
            });
        }
        const attributeIds = ids.split(',');

        const attributeValue = await Attribute.findAll({
            where: { id: attributeIds },
            attributes: ['id', 'name'],
            include: [{
                model: AttributeValue,
                attributes: ['id', 'value']
            }]
        });
        res.status(200).json(
            {
              attributeValue
            }
        )
    }
    catch (err) {
        console.log(err);
        res.status(500).json(
            {
                message: "Something went wrong"
            })
    }

};


module.exports = { createValue, getValue, editAttributeValue, deleteAttributeValue, getValuesByAttributes }