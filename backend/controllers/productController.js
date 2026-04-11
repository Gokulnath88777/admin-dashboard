
const { Product, Category } = require('../models');

const createProduct = async (req, res) => {
  try {
    const admin_id=req.user.id;
    const {productName,brand,description,category_id}=req.body;
    if(!productName || !brand || !description || !category_id)
    {
      return res.status(400).json(
        {
          message:"Field is required"
        }
      )
    }
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const product = await Product.create({
     productName,
     brand,
     description,
     category_id,
     admin_id
    });

    res.status(201).json({
      message: "Product created",
      product
    });

  } catch (err) {
    console.log("createProduct",err.message)
    res.status(500).json(
      {message:"Something went wrong"});
  }
};
const getAllProduct=async (req,res)=>
{
  try
  {
    const products=await Product.findAll();
    res.status(200).json(
      {
        products,
        message:"Products fetched successfully"
      }
    )
  }
  catch(err)
  {
    console.log("get All product",err.message)
    res.status(500).json(
      {
        message:"Something went wrong"
      } 
    )
  }
}
module.exports={createProduct,getAllProduct}