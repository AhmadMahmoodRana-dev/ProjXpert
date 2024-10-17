import mongoose from 'mongoose'

const ExpenseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        expenseCategory: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        ref: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },
        
       
    },
    { timestamps: true }
)

export const Expense = mongoose.model('Expense', ExpenseSchema);
