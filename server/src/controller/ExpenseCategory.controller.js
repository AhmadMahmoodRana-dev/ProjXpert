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