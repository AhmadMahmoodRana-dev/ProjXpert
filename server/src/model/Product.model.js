import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        productCategory: {
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

export const Product = mongoose.model('Product', ProductSchema);
