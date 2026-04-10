const { Product, User } = require("../models");

const createProduct = async (req, res) => {
    try {
        const user=await User.findOne(
            {
                where:
                {
                    
                }
            }
        )
        const {productName,brand,description,}=req.body;
        const product=await Product.create({
            productName,
            brand,
            description

        })
        res.status(201).json({
            product,
            message:"product created successfully"
        })
    }
    catch (error) {

    }
}

module.exports={createProduct}