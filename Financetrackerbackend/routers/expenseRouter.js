import express from "express";
import { addExpence, updateExpence, deleteExpence } from "../controllers/expenceController.js";
import auth from "../middleware/auth.js";

const expenseRouter = express.Router();

// GET expenses filtered by user email
expenseRouter.get('/', auth, async (req, res) => {
  try {
    const Expence = (await import("../modules/expence.js")).default;
    const expenses = await Expence.find({ userEmail: req.user.email });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: protect expense creation so server can attach user email from JWT
expenseRouter.post('/', auth, addExpence);

// PUT: Update expense
expenseRouter.put('/:id', auth, updateExpence);

// DELETE: Delete expense
expenseRouter.delete('/:id', auth, deleteExpence);

export default expenseRouter;