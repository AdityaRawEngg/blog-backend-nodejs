const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const blogRouter = require("./routes/blogRouter");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, resp, next) => {
  resp.header("Access-Control-Allow-Origin", "*");
  resp.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  resp.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.get("/", (req, resp) => {
  resp.send("Welcome to blog server");
});
app.use("/blogs", blogRouter);

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});
