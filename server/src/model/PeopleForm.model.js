import mongoose from 'mongoose'

const PeopleSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        company: {
            type: String,
            default: "none",
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
        email: {
            type: String,
            required: true,
            unique: true, // Ensures that email addresses are unique
            trim: true,
            lowercase: true, // Converts the email to lowercase
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

export const People = mongoose.model("People",PeopleSchema)