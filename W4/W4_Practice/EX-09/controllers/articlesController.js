import { articles, journalists, categories } from '../models/data.js';

// GET all articles
export const getAllArticles = (req, res) => {
    res.status(200).json({
        success: true,
        count: articles.length,
        data: articles
    });
};

// GET single article by ID
export const getArticleById = (req, res) => {
    const { id } = req.params;
    const article = articles.find(a => a.id === parseInt(id));

    if (!article) {
        return res.status(404).json({
            success: false,
            message: `Article with ID ${id} not found`
        });
    }

    res.status(200).json({
        success: true,
        data: article
    });
};

// POST create new article
export const createArticle = (req, res) => {
    const { title, content, journalistId, categoryId } = req.body;

    // Validation
    if (!title || !content || !journalistId || !categoryId) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields: title, content, journalistId, categoryId'
        });
    }

    // Verify journalist exists
    const journalist = journalists.find(j => j.id === parseInt(journalistId));
    if (!journalist) {
        return res.status(400).json({
            success: false,
            message: `Journalist with ID ${journalistId} not found`
        });
    }

    // Verify category exists
    const category = categories.find(c => c.id === parseInt(categoryId));
    if (!category) {
        return res.status(400).json({
            success: false,
            message: `Category with ID ${categoryId} not found`
        });
    }

    // Create new article
    const newArticle = {
        id: articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1,
        title,
        content,
        journalistId: parseInt(journalistId),
        categoryId: parseInt(categoryId)
    };

    articles.push(newArticle);

    res.status(201).json({
        success: true,
        message: 'Article created successfully',
        data: newArticle
    });
};

// PUT update article
export const updateArticle = (req, res) => {
    const { id } = req.params;
    const { title, content, journalistId, categoryId } = req.body;

    const article = articles.find(a => a.id === parseInt(id));

    if (!article) {
        return res.status(404).json({
            success: false,
            message: `Article with ID ${id} not found`
        });
    }

    // Validate journalist if provided
    if (journalistId) {
        const journalist = journalists.find(j => j.id === parseInt(journalistId));
        if (!journalist) {
            return res.status(400).json({
                success: false,
                message: `Journalist with ID ${journalistId} not found`
            });
        }
        article.journalistId = parseInt(journalistId);
    }
-
    // Validate category if provided
    if (categoryId) {
        const category = categories.find(c => c.id === parseInt(categoryId));
        if (!category) {
            return res.status(400).json({
                success: false,
                message: `Category with ID ${categoryId} not found`
            });
        }
        article.categoryId = parseInt(categoryId);
    }

    // Update fields
    if (title) article.title = title;
    if (content) article.content = content;

    res.status(200).json({
        success: true,
        message: 'Article updated successfully',
        data: article
    });
};

// DELETE article
export const deleteArticle = (req, res) => {
    const { id } = req.params;
    const index = articles.findIndex(a => a.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Article with ID ${id} not found`
        });
    }

    const deletedArticle = articles.splice(index, 1);

    res.status(200).json({
        success: true,
        message: 'Article deleted successfully',
        data: deletedArticle[0]
    });
};
