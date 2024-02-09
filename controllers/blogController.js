// controllers/blogController.js

const Blog = require('../models/Blog');

async function createBlog(req, res) {
    try {
        const { title, body, author } = req.body;
        const blog = new Blog({ title, body, author });
        const savedBlog = await blog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getAllBlogs(req, res) {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getBlogById(req, res) {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateBlog(req, res) {
    try {
        const { title, body } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { title, body, updatedAt: Date.now() }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteBlog(req, res) {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
};
