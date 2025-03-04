import { Router, RequestHandler } from "express";
import CategoryController from "../controllers/category.controller";

const router: Router = Router();

router.get("/", CategoryController.getById as RequestHandler);
router.get("/all", CategoryController.getAll as RequestHandler);
router.post("/create", CategoryController.create as RequestHandler);
router.put("/update", CategoryController.update as RequestHandler);
router.delete("/delete", CategoryController.delete as RequestHandler);

export default router;
