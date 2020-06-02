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
    created: {
        type: Date, default: Date.now
    }
})
const Blog = mongoose.model("Blog", blogSchema);

//RESTFUL ROUTES
app.get("/", (req, res) => {
    res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log("ERROR");
        } else {
            res.render("index", { blogs: blogs });
        }
    })

})


// Blog.create({
//     title: "Typewriters are bomb",
//     image: "https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//     body: "Have you ever seen a typewriter like this?!?"
// })


app.listen(3001, "100.115.92.196", () => {
    console.log("Server is running");
});

