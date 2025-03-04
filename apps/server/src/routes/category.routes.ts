import { Router, RequestHandler } from "express";
import CategoryController from "../controllers/category.controller";

const router: Router = Router();

router.get("/category", CategoryController.getById as RequestHandler);
router.get("/category/all", CategoryController.getAll as RequestHandler);
router.post("/category/create", CategoryController.create as RequestHandler);
router.put("/category/update", CategoryController.update as RequestHandler);
router.delete("/category/delete", CategoryController.delete as RequestHandler);

export default router;
