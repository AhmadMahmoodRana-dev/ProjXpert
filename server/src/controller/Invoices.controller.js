import { Invoice } from "../model/InvoicesForm.model.js";

// Create an invoice (POST)
export const postInvoices = async (req, res) => {
    try {
      const newInvoice = new Invoice(req.body);
      await newInvoice.save();
      res.status(201).json(newInvoice);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Get all invoices (GET)
 export const getInvoices = async (req, res) => {
    try {
      const invoices = await Invoice.find();
      res.status(200).json(invoices);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get a single invoice by ID (GET)
  export  const getSingleInvoice = async (req, res) => {
    try {
      const invoice = await Invoice.findById(req.params.id);
      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
      res.status(200).json(invoice);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

 
  
  
  // Update an invoice by ID (PUT)
 export const updateInvoice = async (req, res) => {
    try {
      const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedInvoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
      res.status(200).json(updatedInvoice);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete an invoice by ID (DELETE)
  export const deleteInvoices = async (req, res) => {
    try {
      const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
      if (!deletedInvoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
      res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };