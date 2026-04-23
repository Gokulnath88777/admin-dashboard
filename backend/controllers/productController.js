
const { Product, Category, User, Sequelize, ProductVariant } = require('../models');
const fs = require('fs')
const csv = require('csv-parser')
const createProduct = async (req, res) => {
  try {
    const admin_id = req.user.id;
    const { productName, brand, description, category_id } = req.body;
    if (!productName || !brand || !description || !category_id) {
      return res.status(400).json(
        {
          message: "Field is required"
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
    console.log("createProduct", err.message)
    res.status(500).json(
      { message: "Something went wrong" });
  }
};
const getAllProduct = async (req, res) => {
  try {
    const result = await Product.findAndCountAll({
      attributes:
      {
        include: [
          [
            Sequelize.fn(
              "COUNT",
              Sequelize.col("ProductVariants.id")
            ),
            "variantCount"
          ]
        ]
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"]
        },
        {
          model: User,
          as: 'admin',
          attributes: ["id", "name"]
        },
        {
          model: ProductVariant,
          attributes: [],
        }
      ],
      group: ["Product.id", "category.id", "admin.id"]

    }); res.status(200).json(
      {
        products: result.rows,
        totalProducts: result.count.length,
        message: "Products fetched successfully"
      }
    )
  }
  catch (err) {
    console.log("get All product", err.message)
    res.status(500).json(
      {
        message: "Something went wrong"
      }
    )
  }
}
const bulkCreation = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(
        {
          message: "No file uploaded"
        }
      )
    }
    const results = [];
    const category = await Category.findAll()
    console.log("category", category);
    const categoryMap = {}
    category.forEach(cat => {
      categoryMap[cat.name.toLowerCase()] = cat.id
    });
    fs.createReadStream(req.file.path).pipe(csv())
      .on("data", (row) => {
        const categoryId = categoryMap[row.category.toLowerCase()]
        if (!categoryId) {
          return;
        }
        results.push({
          productName: row.productName,
          brand: row.brand,
          description: row.description,
          category_id: categoryId,
          admin_id: req.user.id
        })
      })
      .on("end", async () => {
        try {
          const inserted = await Product.bulkCreate(results);
          fs.unlinkSync(req.file.path);
          return res.status(201).json({
            message: "Product created successfully",
            totalInserted: inserted.length
          });

        } catch (err) {
          console.log("error", err);
          return res.status(500).json({ message: "insert failed" });
        }
      })
      .on("error", (err) => {
        console.log("Csv error:", err);
      })



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

module.exports = { createProduct, getAllProduct, bulkCreation }