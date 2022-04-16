var express = require("express");
var logger = require("morgan");
var cors = require("cors");
var app = express();

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger("dev"));


/** Define routes here */

const blogRoutes = require("./routes/blogRoute");
const authRoutes = require("./routes/authRoute");


app.use("/blogs", blogRoutes);
app.use("/auth", authRoutes);


/** Server  */
const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server running on port : ${port}`))
module.exports = app;
