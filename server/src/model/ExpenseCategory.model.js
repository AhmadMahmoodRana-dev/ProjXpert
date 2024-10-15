import mongoose from 'mongoose'

const ExpenseCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        enabled: {
            type: Boolean,
            required: true,
        },
       
    },
    { timestamps: true }
)

export const ExpenseCategory = mongoose.model('ExpenseCategory', ExpenseCategorySchema);
