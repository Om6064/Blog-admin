const BlogModel = require("../models/blogModel.js");
const fs = require("fs");
const path = require("path");

// Home page controller
const getHomePage = async (req, res) => {
    try {
        const data = await BlogModel.find({});
        res.render("index", { blogs: data });
    } catch (error) {
        console.log(error);
    }
};

// Render blog creation form
const renderBlogForm = (req, res) => {
    res.render("blogForm");
};

// Create a new blog
const createBlog = async (req, res) => {
    try {
        const { path } = req.file;
        const blogData = new BlogModel({ ...req.body, blogImage: path });
        await blogData.save();
        res.redirect("/admin");
    } catch (error) {
        console.log(error);
    }
};

// Delete a blog
const removeBlog = async (req, res) => {
    try {
        let { id } = req.params;
        let data = await BlogModel.findById(id);

        let imgPath = path.join(__dirname, "..", data?.blogImage);
        fs.unlink(imgPath, err => err && console.log(err));

        await BlogModel.findByIdAndDelete(id);
        res.redirect("/admin");
    } catch (error) {
        console.log(error);
    }
};

// Render edit form
const renderEditForm = async (req, res) => {
    try {
        let { id } = req.params;
        let data = await BlogModel.findById(id);
        res.render("editForm", { data });
    } catch (error) {
        console.log(error);
    }
};

// Update blog
const updateBlog = async (req, res) => {
    try {
        let { id } = req.params;
        let updatedData = req.body;

        if (req.file) {
            let data = await BlogModel.findById(id);
            let imgPath = path.join(__dirname, "..", data?.blogImage);
            fs.unlink(imgPath, err => err && console.log(err));

            updatedData.blogImage = req.file.path;
        }

        await BlogModel.findByIdAndUpdate(id, updatedData);
        res.redirect("/admin");
    } catch (error) {
        console.log(error);
    }
};

// Quick view blog
const renderQuickView = async (req, res) => {
    try {
        let { id } = req.params;
        let blog = await BlogModel.findById(id);
        res.render("quickView", { blog });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getHomePage,
    renderBlogForm,
    createBlog,
    removeBlog,
    renderEditForm,
    updateBlog,
    renderQuickView
};
