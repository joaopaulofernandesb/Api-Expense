import express from 'express';
import {
  getExpensesByMonth,
  createExpense,
  updateExpense,
  deleteExpense,
  getAllExpensers,
} from '../controllers/ExpenseController';
import authenticateToken from '../middleware/authenticateToken';

const router = express.Router();

router.get('/expenses/:userId/:month/:year', authenticateToken, getExpensesByMonth);
router.get('/expenses/:userId',authenticateToken,getAllExpensers)
router.post('/expenses', authenticateToken, createExpense);
router.put('/expenses/:id', authenticateToken, updateExpense);
router.delete('/expenses/:id', authenticateToken, deleteExpense);

export default router;
