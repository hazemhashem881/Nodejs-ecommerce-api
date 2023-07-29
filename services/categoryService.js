const CategoryModel = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const apiError = require('../utils/apiError');  
const ApiError = require('../utils/apiError');

// @desc Get list of categories
// @route Get /api/v1/categories
// @access Pubblic

exports.getCategories = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page -1) * limit;
    const categories = await CategoryModel.find({}).skip(skip).limit(limit);
    res.status(200).json({result: categories.length,page, data: categories});
});

// @desc Get specific category by id
// @route Get /api/v1/categories/:id
// @access public

exports.getCategory = asyncHandler(async (req, res) => {
    const id  = req.params.id;
    const category = await CategoryModel.findById(id);
    if(!category){
        // res.status(404).json({ msg: `No category for this id ${id}` });
        next(new ApiError(`No category for this id ${id}`,404));
    }
    res.status(200).json({data: category});
});

// @desc create category
// @route POST /api/v1/categories
// @access Private
exports.createCategory = asyncHandler (async (req, res) => {
    const name = req.body.name;
    const category = await CategoryModel.create({name, slug: slugify(name)});
    res.status(201).json({data: category });
});


// @desc Update specific category
// @route PUT /api/v1/categories
// @access Private
exports.updateCategory = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const category = await CategoryModel.findOneAndUpdate(
        { _id: id },
        { name, slug: slugify(name) },
        { new: true }
    );
    if(!category){
        // res.status(404).json({ msg: `No category for this id ${id}` });
        next(new ApiError(`No category for this id ${id}`,404));

    }
    res.status(200).json({data: category});

})

// @desc Delete specific category
// @route DELETE /api/v1/categories
// @access Private
exports.deleteCategory = asyncHandler(async(req, res) =>{
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndDelete(id);
    if(!category){
        // res.status(404).json({ msg: `No category for this id ${id}` });
        next(new ApiError(`No category for this id ${id}`,404));
    }
    res.status(204).send();

})