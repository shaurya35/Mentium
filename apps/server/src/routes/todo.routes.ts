import { Router, RequestHandler } from 'express';
import TodoController from '../controllers/todo.controller';

const router: Router = Router();

router.get('/todo', TodoController.getById as RequestHandler);
router.get('/todo/category', TodoController.getByCategory as RequestHandler);
router.post('/todo/create', TodoController.create as RequestHandler);
router.put('/todo/update', TodoController.update as RequestHandler);
router.delete('/todo/delete', TodoController.delete as RequestHandler);

export default router;