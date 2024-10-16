import { ExpenseCategory } from "../model/ExpenseCategory.model.js"

export const postExpenseCategory = async (req, res) => {
    try {
        const data = req.body
        const result = await ExpenseCategory.create(data)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({
            error: error,
        })
    }
}

export const getExpenseCategory = async (req, res) => {
    try {
        const result = await ExpenseCategory.find()
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
export  const getSingleExpenseCategory = async (req, res) => {
    try {
      const invoice = await ExpenseCategory.findById(req.params.id);
      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
      res.status(200).json(invoice);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update an invoice by ID (PUT)
 export const updateExpenseCategory = async (req, res) => {
    try {
      const updatedExpenseCategory = await ExpenseCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedExpenseCategory) {
        return res.status(404).json({ message: 'ExpenseCategory not found' });
      }
      res.status(200).json(updatedExpenseCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const deleteExpenseCategory = async (req, res) => {
    try {
      const deletedExpenseCategory = await ExpenseCategory.findByIdAndDelete(req.params.id);
      if (!deletedExpenseCategory) {
        return res.status(404).json({ message: 'Expense Category not found' });
      }
      res.status(200).json({ message: 'Expense Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };