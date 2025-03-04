import express from "express";

const app = express();
app.use(express.json());

app.use("/health", (req, res) => {
  res.json({
    message: "Health Check",
  });
});

import categoryRoutes from "./routes/category.routes";
import todoRoutes from "./routes/todo.routes";
import errorHandler from "./middlewares/error.Handler";
import requestLogger from "./middlewares/request.Logger";

app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/todos", todoRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(requestLogger);
app.use(errorHandler);

import { PORT } from "./configs/env.config";

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
