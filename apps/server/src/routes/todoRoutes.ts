import { Router, RequestHandler } from 'express';
import TodoController from '../controllers/todoControllers';

const router: Router = Router();

router.get('/', TodoController.getById as RequestHandler);
router.get('/category', TodoController.getByCategory as RequestHandler);
router.post('/create', TodoController.create as RequestHandler);
router.put('/update', TodoController.update as RequestHandler);
router.delete('/delete', TodoController.delete as RequestHandler);

export default router;