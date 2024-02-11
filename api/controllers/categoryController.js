const categoryModel = require('../models/categoryModel');
const slugify = require('slugify');

const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: "Name is required" });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: false,
                message: "Category already exists"
            })
        }
        const category = await new categoryModel({
            name,
            slug: slugify(name)
        }).save();

        return res.status(200).send({
            success: true,
            message: "Category added successfully",
            category
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            error,
            message: "error in category creation"
        })
    }
}

//update category
const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while updating category'
        })
    }
}
//get all categories
const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});

        res.status(200).send({
            success: true,
            message: 'All Categories List',
            category
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error while all categories fetching"
        })

    }
}

//Single category
const singleCategoryController = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await categoryModel.findOne({ slug });
        res.status(200).send({
            success: true,
            message: 'Single category data fetched successfully',
            category
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error while fetching single category'
        })
    }
}

//Delete category
const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: 'Category deleted successfully',
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error while deleting category'
        })
    }
}

module.exports = { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController };