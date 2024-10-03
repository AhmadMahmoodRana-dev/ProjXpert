const mongoose = require('mongoose')

const leadSchema = new mongoose.Schema(
    {
        branch: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['people,company'],
            default: 'people',
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
                'Other'
            ],
            default: 'Other',
        },
        country: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        project: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
)

export const Lead = mongoose.model('Lead', leadSchema)
