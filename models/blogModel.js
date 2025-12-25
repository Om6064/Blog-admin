const { default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema({
    blogTitle: {
        type: String,
        required: true,
    },
    blogImage: {
        type: String,
        required: true,
    },
    blogTags: {
        type: String,
        required: true,
    },
    blogDescription: {
        type: String,
        required: true,
    },
})

const BlogModel = mongoose.model("BlogModel", blogSchema);

module.exports = BlogModel;