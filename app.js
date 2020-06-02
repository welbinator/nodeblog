const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// GETS RID OF SOME DEPRECATION ERRORS
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);




// APP CONFIG
mongoose.connect("mongodb://localhost/node_blog");
mongoose.connection.on('error', err => {
    throw 'failed connect to MongoDB';
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));


// MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    date: {
        type: Date, default: Date.now
    }
})
const Blog = mongoose.model("Blog", blogSchema);

//RESTFUL ROUTES
app.get("/", (req, res) => {
    res.redirect("/blogs");
});

//INDEX
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log("ERROR");
        } else {
            res.render("index", { blogs: blogs });
        }
    })

})
//NEW ROUTE
app.get("/blogs/new", (req, res) => {
    res.render("new")
})

//CREATE ROUTE
app.post("/blogs", (req, res) => {
    Blog.create(req.body.blog, (err, newBlog) => {
        if (err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    })
})

//SHOW ROUTE
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", { blog: foundBlog });
        }
    })
})


app.listen(3001, "100.115.92.199", () => {
    console.log("Server is running");
});

