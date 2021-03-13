const express = require("express");

// express app
const app = express();


const blogRoutes = require("./routes/blogRoutes");

const path = require("path");



// connect to mongodb & listen for requests
const mongoose = require("mongoose");
const dbURI =
  "mongodb+srv://amgadMostafa:amar1234567800@cluster0.d9ymw.mongodb.net/<blogs>?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(5501))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware & static files
const morgan = require("morgan");


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
