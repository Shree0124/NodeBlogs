const express = require("express");
const authRoutes = require("./routers/userRouters.js");
const BlogRoutes = require("./routers/BlogRoutes.js");
const app = express();
app.use(express.json());
app.use("/app/v1/users", authRoutes);
app.use("/app/v1/blogs", BlogRoutes);
module.exports = app;
