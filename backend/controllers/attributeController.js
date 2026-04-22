const { Attribute, AttributeValue, Sequelize } = require('../models');

const createAttribute = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        const data = await Attribute.create({ name });
        res.status(201).json({
            message: "Attribute created successfully",
            data
        });

    } catch (err) {
        console.log("Attribute", err.message)
        res.status(500).json({
            message: "Something went wrong"
        });
    }
};

const getAttributes = async (req, res) => {
    try {

        const data = await Attribute.findAll({
            attributes: [
                'id',
                'name',
                [
                    Sequelize.fn(
                        'COUNT',
                        Sequelize.col('AttributeValues.id')
                    ),
                    'value_count'
                ]
            ],
            include: {
                model: AttributeValue,
                attributes: [],
            },
            group: ['Attribute.id']
        });

        res.json(data);

    } catch (error) {
        res.status(500).json(error.message);
    }
};


const editAttribute = async (req, res) => {
    try {

        const { id } = req.params
        const { updatedName } = req.body
        const attribute = await Attribute.findByPk(id)
        if (!attribute) {

            return res.status(404).json(
                {

                    message: "Not found"
                }
            )
        }
        const data = await Attribute.update({ name: updatedName }, { where: { id } })
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
const deleteAttribute = async (req, res) => {

    try {
        const { id } = req.params;
        const deleted = await Attribute.destroy({
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
                message: "Attribute deleted successfully"
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

module.exports = { createAttribute, getAttributes, editAttribute, deleteAttribute }