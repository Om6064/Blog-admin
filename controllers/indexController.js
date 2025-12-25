const BlogModel = require("../models/blogModel.js");
const fs = require("fs");
const path = require("path");
exports.home = async (req, res) => {
    try {
        const data = await BlogModel.find({});
        // console.log(data)
        res.render("index", { blogs: data });
    } catch (error) {
        console.log(error)
    }
}

exports.blogForm = (req, res) => {
    res.render("blogForm");
}

exports.addBlog = async (req, res) => {
    try {
        // console.log(req.body)
        const { path } = req.file;
        const blogData = new BlogModel({ ...req.body, blogImage: path });
        await blogData.save();
        res.redirect("/");
    } catch (error) {
        console.log(error)
    }

}

exports.deleteBlog = async (req, res) => {
    try {
        let { id } = req.params;
        let data = await BlogModel.findById(id);
        console.log(data);
        let imgPath = path.join(__dirname, "..", data?.blogImage);
        fs.unlink(imgPath, err => err && console.log(err));
        await BlogModel.findByIdAndDelete(id);
        res.redirect("/");
    } catch (error) {
        console.log(error)
    }
}

exports.editForm = async (req, res) => {
    try {
        let { id } = req.params;
        let data = await BlogModel.findById(id);
        res.render("editForm", { data });
    } catch (error) {
        console.log(error);
    }
}

exports.editBlog = async (req, res) => {
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
        res.redirect("/");
    } catch (error) {
        console.log(error)
    }
}

exports.quickView = async (req, res) => {
    try {
        let { id } = req.params;
        let blog = await BlogModel.findById(id);
        res.render("quickView", {blog});
    } catch (error) {
        console.log(error)
    }
}