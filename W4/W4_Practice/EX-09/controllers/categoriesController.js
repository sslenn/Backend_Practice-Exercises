import { articles, categories } from '../models/data.js';

// GET all categories
export const getAllCategories = (req, res) => {
    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
    });
};

// GET single category by ID
export const getCategoryById = (req, res) => {
    const { id } = req.params;
    const category = categories.find(c => c.id === parseInt(id));

    if (!category) {
        return res.status(404).json({
            success: false,
            message: `Category with ID ${id} not found`
        });
    }

    res.status(200).json({
        success: true,
        data: category
    });
};

// POST create new category
export const createCategory = (req, res) => {
    const { name } = req.body;

    // Validation
    if (!name) {
        return res.status(400).json({
            success: false,
            message: 'Please provide category name'
        });
    }

    // Check for duplicate name
    const existingCategory = categories.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (existingCategory) {
        return res.status(400).json({
            success: false,
            message: 'Category name already exists'
        });
    }

    // Create new category
    const newCategory = {
        id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1,
        name
    };

    categories.push(newCategory);

    res.status(201).json({
        success: true,
        message: 'Category created successfully',
        data: newCategory
    });
};

// PUT update category
export const updateCategory = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const category = categories.find(c => c.id === parseInt(id));

    if (!category) {
        return res.status(404).json({
            success: false,
            message: `Category with ID ${id} not found`
        });
    }

    // Check for duplicate name
    if (name && name.toLowerCase() !== category.name.toLowerCase()) {
        const existingCategory = categories.find(c => c.name.toLowerCase() === name.toLowerCase());
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category name already exists'
            });
        }
        category.name = name;
    }

    res.status(200).json({
        success: true,
        message: 'Category updated successfully',
        data: category
    });
};

// DELETE category
export const deleteCategory = (req, res) => {
    const { id } = req.params;
    const index = categories.findIndex(c => c.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Category with ID ${id} not found`
        });
    }

    const deletedCategory = categories.splice(index, 1);

    res.status(200).json({
        success: true,
        message: 'Category deleted successfully',
        data: deletedCategory[0]
    });
};

// GET articles by category ID
export const getArticlesByCategory = (req, res) => {
    const { id } = req.params;

    // Verify category exists
    const category = categories.find(c => c.id === parseInt(id));
    if (!category) {
        return res.status(404).json({
            success: false,
            message: `Category with ID ${id} not found`
        });
    }

    // Get all articles in category
    const categoryArticles = articles.filter(a => a.categoryId === parseInt(id));

    res.status(200).json({
        success: true,
        count: categoryArticles.length,
        category,
        data: categoryArticles
    });
};
