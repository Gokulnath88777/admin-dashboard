const { Image, ProductVariant } = require("../models");

const imageController = async (req, res) => {
    try {

        const { variant_id, image_url } = req.body;
        if (!variant_id && image_url) {
            return res.status(400).json(
                {
                    message: "Field is required"
                }
            )
        }
        const variant = await ProductVariant.findByPk(variant_id)
        const image = await Image.create(
            {
                variant_id,
                image_url
            }
        )
        res.status(200).json({
            message: "Image added Successfully"
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
module.exports={imageController}