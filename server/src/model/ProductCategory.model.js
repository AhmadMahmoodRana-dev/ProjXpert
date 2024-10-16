import mongoose from 'mongoose'

const ProductCategorySchema = new mongoose.Schema(
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

export const ProductCategory = mongoose.model('ProductCategory', ProductCategorySchema);
