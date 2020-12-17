const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const blogRouter = require("./routes/blogRouter");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", (req, resp) => {
  resp.send("Welcome to blog server");
});
app.use("/blogs", blogRouter);

app.listen(PORT, () => {
  console.log("Server Started on Port 3000");
});
