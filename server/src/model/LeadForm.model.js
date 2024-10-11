import mongoose from 'mongoose'

const leadSchema = new mongoose.Schema(
    {
        branch: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['People', 'Company'],
            default: 'People',
        },
        name: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: [
                'Draft',
                'New',
                'In Negociation',
                'Won',
                'Loose',
                'Cancled',
                'Assigned',
                'On Hold',
            ],
            default: 'Draft',
        },
        source: {
            type: String,
            required: true,
            enum: [
                'Linkedin',
                'Social Media',
                'Website',
                'Advertising',
                'Friend',
                'Professional Network',
                'Customer Referral',
                'Sales',
                'Other',
            ],
            default: 'Other',
        },
        country: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
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
        project: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
)

export const Lead = mongoose.model('Lead', leadSchema)
