import express from "express";

const app = express();

app.use("/", (req, res) => {
  res.json({
    message: "Test Route",
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
