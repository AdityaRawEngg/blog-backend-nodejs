const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const blogRouter = require("./routes/blogRouter");
const PORT = process.env.PORT || 3000;

const surfboard = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "surfboard.json"), "utf-8")
);
const raw = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "raw.json"), "utf-8")
);
const contentstack = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "cs.json"), "utf-8")
);

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

app.get("/cs", (req, resp) => {
  resp.status(200).json({ data: contentstack });
});

app.get("/raw", (req, resp) => {
  resp.status(200).json({ data: raw });
});

app.get("/surfboard", (req, resp) => {
  resp.status(200).json({ data: surfboard });
});

app.use("/blogs", blogRouter);

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});
