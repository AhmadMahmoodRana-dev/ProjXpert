import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  client: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    enum: ['USD', 'EUR', 'GBP', 'other'], // Add other currencies as needed
    required: true,
  },
  status: {
    type: String,
    enum: ['Draft', 'Pending', 'Paid'],
    default: 'Draft',
  },
  date: {
    type: Date,
    required: true,
  },
  expireDate: {
    type: Date,
    required: true,
  },
  note: {
    type: String,
    default: '',
  },
  items: [
    {
      itemName: {
        type: String,
        required: true,
      },
      descriptionName: {
        type: String,
        required: false,
      },
      quantity: {
        type: Number,
        required: true,
        min: 0,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  subTotal: {
    type: Number,
    required: true,
    min: 0,
  },
  tax: {
    type: Number,
    required: true,
    min: 0,
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
});

export const Invoice = mongoose.model('Invoice', invoiceSchema);
