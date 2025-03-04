import { Request, Response, NextFunction } from "express";
import prisma from "../common/utils/db";
import Category from "../domains/category.domain";

class CategoryController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categoriesData = await prisma.category.findMany();
      const categories = categoriesData.map(
        (data) =>
          new Category(data.id, data.name, data.createdAt, data.updatedAt)
      );
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.body.id, 10);
      const data = await prisma.category.findUnique({ where: { id } });
      if (!data) {
        return res.status(404).json({ message: "Category not found" });
      }
      const category = new Category(
        data.id,
        data.name,
        data.createdAt,
        data.updatedAt
      );
      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      const newCategory = Category.createNew(name);
      const createdData = await prisma.category.create({
        data: { name: newCategory.name },
      });
      const category = new Category(
        createdData.id,
        createdData.name,
        createdData.createdAt,
        createdData.updatedAt
      );
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, name } = req.body;
      const parsedId = parseInt(id, 10);
      console.log(parsedId)
      const data = await prisma.category.findUnique({ where: { id: parsedId } });
      if (!data) {
        return res.status(404).json({ message: "Category not found" });
      }

      const category = new Category(
        data.id,
        data.name,
        data.createdAt,
        data.updatedAt
      );

      if (name !== undefined) {
        category.updateName(name);
      }
      const updatedData = await prisma.category.update({
        where: { id: parsedId },
        data: { name: category.name },
      });
      const updatedCategory = new Category(
        updatedData.id,
        updatedData.name,
        updatedData.createdAt,
        updatedData.updatedAt
      );
      res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.body.id, 10);
      const deletedCategory = await prisma.category.delete({
        where: { id },
      });
      res.json(deletedCategory);
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;
