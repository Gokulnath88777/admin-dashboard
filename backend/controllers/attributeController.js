const { Attribute } = require('../models');

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
        const attributes = await Attribute.findAll();
        res.status(200).json({
            attributes,
            message: "Attributes fetched successfully",
            
        });

    } catch (err) {
        console.log(err.message)
        res.status(500).json(
            {
                 message:"Something went wrong"
            });
    }
};

module.exports = { createAttribute, getAttributes }