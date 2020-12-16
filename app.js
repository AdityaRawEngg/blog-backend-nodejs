const express = require("express");
const blogRouter = require("./routes/blogRouter");

const app = express();

app.use(express.json());

app.use("/blogs", blogRouter);

app.listen(3000, () => {
  console.log("Server Started on Port 3000");
});
