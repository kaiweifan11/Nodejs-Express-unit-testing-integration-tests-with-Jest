const express = require("express");
const todoRoutes = require("./routes/todo.routes");
const app = express();
const mongodb = require("./mongodb/mongodb.connect");

mongodb.connect();

app.use(express.json());

app.use("/todos", todoRoutes);

// add middleware to handle error response
app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message});
});

app.get("/", (req, res) => {
    // res.send("Hello World!");
    res.json("Hello World!");
})

module.exports = app;