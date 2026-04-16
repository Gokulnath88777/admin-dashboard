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
           categories,
           message:"Data get Successfully"
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
const editCategory = async (req, res) => {
    try {

        const { id } = req.params
        const { updatedName } = req.body
        const category = await Category.findByPk(id)
        if (!category) {
            return res.status(404).json(
                {
                    message: "Not found"
                }
            )
        }
        const data = await Category.update({ name: updatedName }, { where: { id } })
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
const deleteCategory = async (req, res) => {

    try {
        const { id } = req.params;
        const deleted = await Category.destroy({
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
                message: "Category deleted successfully"
            }
        )
    }
    catch(err)
    {
        console.log(err.message)
        res.status(500).json(
            {
                message:"Something went wrong"
            }
        )
    }

}

module.exports = { createCategory, getAllCategory, editCategory ,deleteCategory }