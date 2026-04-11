const { Category } = require('../models');

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json(
                {
                    message: "Field is required"
                }
            )
        }
        const category = await Category.create({
            name
        });

        res.status(201).json({
            message: "Category created",
            category
        });

    } catch (err) {
        console.log(err.message)
        res.status(500).json(
            { message: "Something went wrong" });
    }
};
const getAllCategory = async (req, res) => {
    try {

        const categories = await Category.findAll();
        res.status(200).json({
            message:
            {
                categories
            }
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
module.exports = { createCategory, getAllCategory }