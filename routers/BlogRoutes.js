// const express = require("express");
const router = require("express").Router();
const {auth,verifyRole} = require("../middlewares/authMiddleware");
const {
  postBlog,
  getBlogs,
  getBlog,
  patchBlog,
  deleteBlog,
  getByAuthor,
} = require("../controllers/blogControllers.js");
const { verify } = require("jsonwebtoken");


router.post("/", auth, verifyRole("author||admin"), postBlog);
router.get("/", auth, getBlogs);
// router.get("/author",auth,getByAuthor)
router.get("/:id", auth, getBlog);
router.patch("/:id", auth, patchBlog);
router.delete("/:id", auth, deleteBlog);
module.exports = router;
