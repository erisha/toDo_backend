import {Router} from 'express';
import Todo from '../models/todo';


const router = new Router();

router.get('/', async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });



export default router;