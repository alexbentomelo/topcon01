import { Request, Response } from 'express';
import Todo, { ITodo } from '../models/Todo';

export const getAllTodos = async (_req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch todos' });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, labelId } = req.body;
    const todo: ITodo = new Todo({ title, description, labelId });
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create todo' });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, labelId } = req.body;
    const todoId = req.params.id;

    const todo = await Todo.findByIdAndUpdate(
      todoId,
      { title, description, labelId },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update todo' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todoId = req.params.id;

    const todo = await Todo.findByIdAndDelete(todoId);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete todo' });
  }
};
