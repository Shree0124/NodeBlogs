const Blog = require("../models/blogs");

const postBlog = async (req, res) => {
  try {
    let user = req.user;
    const newBlog = await Blog.create({
      title: req.body.title,
      snippet: req.body.snippet,
      description: req.body.description,
      image: req.body.image,
      author: user._id,
    });
    res.status(201).json({
      status: "success",

      data: {
        newBlog,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      type: "success",
      data: {
        blogs,
      },
    });
  } catch (err) {
    res.status(500).json({
      type: "error",
      message: "Something went wrong please try again",
      err,
    });
  }
};
const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({
        type: "error",
        message: "Post doesn't exists",
      });
    } else {
      res.status(200).json({
        type: "success",
        data: {
          blog,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      type: "error",
      message: "Something went wrong please try again",
      err,
    });
  }
};
const patchBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        updatedBlog,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
const deleteBlog = async (req, res) => {
  try {
    let user = req.user;
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
const getByAuthor = async (req, res) => {
  try {
    let user = req.user;
    const blogs = await Blog.find({ author: user._id });
    res.status(201).json({
      status: "success",
      data: {
        blogs,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = {
  postBlog,
  getBlogs,
  getBlog,
  patchBlog,
  deleteBlog,
  getByAuthor,
};
