import { Request, Response, NextFunction } from "express";
import prisma from "../common/utils/db";
import Todo from "../domains/todo.domain";

class TodoController {
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.body.id;
      const todoData = await prisma.todo.findUnique({
        where: { id },
        include: { subtodos: true },
      });
      if (!todoData) {
        return res.status(404).json({ message: "Todo not found" });
      }
      const todo = new Todo(
        todoData.id,
        todoData.title,
        todoData.description,
        todoData.deadline,
        todoData.allDay,
        todoData.priority,
        todoData.labels,
        todoData.completed,
        todoData.categoryId,
        todoData.parentId ?? undefined,
        todoData.createdAt,
        todoData.updatedAt
      );
      res.json(todo);
    } catch (error) {
      next(error);
    }
  }

  static async getByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId = req.body.categoryId;
      const todosData = await prisma.todo.findMany({
        where: { categoryId, parentId: null },
        include: { subtodos: true },
      });
      const todos = todosData.map((todoData) => {
        return new Todo(
          todoData.id,
          todoData.title,
          todoData.description,
          todoData.deadline,
          todoData.allDay,
          todoData.priority,
          todoData.labels,
          todoData.completed,
          todoData.categoryId,
          todoData.parentId ?? undefined,
          todoData.createdAt,
          todoData.updatedAt
        );
      });
      res.json(todos);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, deadline, allDay, priority, labels, categoryId, parentId } = req.body;
      const todoDomainInstance = Todo.createNew(
        title, description, new Date(deadline), allDay, categoryId, parentId, priority, labels
      );

      const createdData = await prisma.todo.create({
        data: {
            title: todoDomainInstance.title,
            description: todoDomainInstance.description,
            deadline: todoDomainInstance.deadline,
            allDay: todoDomainInstance.allDay,
            priority: todoDomainInstance.priority,
            labels: todoDomainInstance.labels,
            categoryId: todoDomainInstance.categoryId,
            parentId: todoDomainInstance.parentId,
        },
        include: { subtodos: true },
      })

      const todo = new Todo(
        createdData.id,
        createdData.title,
        createdData.description,
        createdData.deadline,
        createdData.allDay,
        createdData.priority,
        createdData.labels,
        createdData.completed,
        createdData.categoryId,
        createdData.parentId ?? undefined,
        createdData.createdAt,
        createdData.updatedAt
      )

      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.body.id;
        const todoData = await prisma.todo.findUnique({
            where: { id },
        })
        if (!todoData) {
            return res.status(404).json({ message: "Todo not found" });
        }
        const todo = new Todo(
            todoData.id,
            todoData.title,
            todoData.description,
            todoData.deadline,
            todoData.allDay,
            todoData.priority,
            todoData.labels,
            todoData.completed,
            todoData.categoryId,
            todoData.parentId ?? undefined,
            todoData.createdAt,
            todoData.updatedAt
        );

        if(req.body.title !== undefined) {
            todo.title = req.body.title;
        }
        if(req.body.description !== undefined) {
            todo.description = req.body.description;
        }
        if(req.body.deadline !== undefined) {
            todo.deadline = new Date(req.body.deadline);
        }
        if(req.body.allDay !== undefined) {
            todo.allDay = req.body.allDay;
        }
        if(req.body.priority !== undefined) {
            todo.priority = req.body.priority;
        }
        if(req.body.labels !== undefined) {
            todo.labels = req.body.labels;
        }
        if(req.body.completed !== undefined) {
            todo.completed = req.body.completed;
        }

        const updatedData = await prisma.todo.update({
            where: { id },
            data: {
                title: todo.title,
                description: todo.description,
                deadline: todo.deadline,
                allDay: todo.allDay,
                priority: todo.priority,
                labels: todo.labels,
                completed: todo.completed,
            },
        })

        const updatedTodo = new Todo(
            updatedData.id,
            updatedData.title,
            updatedData.description,
            updatedData.deadline,
            updatedData.allDay,
            updatedData.priority,
            updatedData.labels,
            updatedData.completed,
            updatedData.categoryId,
            updatedData.parentId ?? undefined,
            updatedData.createdAt,
            updatedData.updatedAt
        )
        res.json(updatedTodo);
    }catch(error) {
        next(error);
    }   
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.body.id;
        const deletedTodo = await prisma.todo.delete({
            where: { id },
        })
        res.json(deletedTodo);
    }catch(error) {
        next(error);
    }
  }
}

export default TodoController;