import { articles, journalists } from '../models/data.js';

// GET all journalists
export const getAllJournalists = (req, res) => {
    res.status(200).json({
        success: true,
        count: journalists.length,
        data: journalists
    });
};

// GET single journalist by ID
export const getJournalistById = (req, res) => {
    const { id } = req.params;
    const journalist = journalists.find(j => j.id === parseInt(id));

    if (!journalist) {
        return res.status(404).json({
            success: false,
            message: `Journalist with ID ${id} not found`
        });
    }

    res.status(200).json({
        success: true,
        data: journalist
    });
};

// POST create new journalist
export const createJournalist = (req, res) => {
    const { name, email } = req.body;

    // Validation
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields: name, email'
        });
    }

    // Check for duplicate email
    const existingJournalist = journalists.find(j => j.email === email);
    if (existingJournalist) {
        return res.status(400).json({
            success: false,
            message: 'Email already exists'
        });
    }

    // Create new journalist
    const newJournalist = {
        id: journalists.length > 0 ? Math.max(...journalists.map(j => j.id)) + 1 : 1,
        name,
        email
    };

    journalists.push(newJournalist);

    res.status(201).json({
        success: true,
        message: 'Journalist created successfully',
        data: newJournalist
    });
};

// PUT update journalist
export const updateJournalist = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    const journalist = journalists.find(j => j.id === parseInt(id));

    if (!journalist) {
        return res.status(404).json({
            success: false,
            message: `Journalist with ID ${id} not found`
        });
    }

    // Check for duplicate email
    if (email && email !== journalist.email) {
        const existingJournalist = journalists.find(j => j.email === email);
        if (existingJournalist) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }
        journalist.email = email;
    }

    if (name) journalist.name = name;

    res.status(200).json({
        success: true,
        message: 'Journalist updated successfully',
        data: journalist
    });
};

// DELETE journalist
export const deleteJournalist = (req, res) => {
    const { id } = req.params;
    const index = journalists.findIndex(j => j.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Journalist with ID ${id} not found`
        });
    }

    const deletedJournalist = journalists.splice(index, 1);

    res.status(200).json({
        success: true,
        message: 'Journalist deleted successfully',
        data: deletedJournalist[0]
    });
};

// GET articles by journalist ID
export const getArticlesByJournalist = (req, res) => {
    const { id } = req.params;

    // Verify journalist exists
    const journalist = journalists.find(j => j.id === parseInt(id));
    if (!journalist) {
        return res.status(404).json({
            success: false,
            message: `Journalist with ID ${id} not found`
        });
    }

    // Get all articles by journalist
    const journalistArticles = articles.filter(a => a.journalistId === parseInt(id));

    res.status(200).json({
        success: true,
        count: journalistArticles.length,
        journalist,
        data: journalistArticles
    });
};
