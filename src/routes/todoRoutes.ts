import { Router } from 'express';
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todoController';

const router = Router();

router.get('/todos', getAllTodos);
router.post('/todos', createTodo);
router.put('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);

export default router;