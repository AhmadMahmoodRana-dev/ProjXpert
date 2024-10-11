import mongoose from 'mongoose'

const CompanySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        contact: {
            type: String,
            required: true,
            trim: true,
        },
        website: {
            type: String,
            default: 'none',
            trim: true,
        },
        country: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate: {
                validator: function (v) {
                    // Basic email validation regex
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
                },
                message: (props) => `${props.value} is not a valid email!`,
            },
        },
    },
    { timestamps: true }
)

export const Company = mongoose.model('Company', CompanySchema)
