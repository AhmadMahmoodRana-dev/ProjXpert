import { Expense } from "../model/Expense.model.js"

export const postExpense = async (req, res) => {
    try {
        const data = req.body
        const result = await Expense.create(data)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({
            error: error,
        })
    }
}

export const getExpense = async (req, res) => {
    try {
        const result = await Expense.find()
        res.status(201).json({
            message: result,
        })
    } catch (error) {
        res.json({
            error: error,
        })
    }
}

// // Get a single invoice by ID (GET)
export  const getSingleExpense = async (req, res) => {
    try {
      const invoice = await Expense.findById(req.params.id);
      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
      res.status(200).json(invoice);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update an invoice by ID (PUT)
 export const updateExpense = async (req, res) => {
    try {
      const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
      res.status(200).json(updatedExpense);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const deleteExpense = async (req, res) => {
    try {
      const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
      if (!deletedExpense) {
        return res.status(404).json({ message: 'Expense  not found' });
      }
      res.status(200).json({ message: 'Expense  deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };