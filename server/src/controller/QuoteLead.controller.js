import { QuoteLead } from "../model/QuotesLead.model.js";

// Create an invoice (POST)
export const postQuoteLead = async (req, res) => {
    try {
      const newQuoteLead = new QuoteLead(req.body);
      await newQuoteLead.save();
      res.status(201).json(newQuoteLead);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Get all QuoteLeads (GET)
 export const getQuoteLeads = async (req, res) => {
    try {
      const QuoteLeads = await QuoteLead.find();
      res.status(200).json(QuoteLeads);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get a single QuoteLead by ID (GET)
  export  const getSingleQuoteLead = async (req, res) => {
    try {
      const QuoteLeads = await QuoteLead.findById(req.params.id);
      if (!QuoteLeads) {
        return res.status(404).json({ message: 'QuoteLead not found' });
      }
      res.status(200).json(QuoteLeads);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

 
  
  
  // Update an invoice by ID (PUT)
 export const updateQuoteLead = async (req, res) => {
    try {
      const updatedQuoteLead = await QuoteLead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedQuoteLead) {
        return res.status(404).json({ message: 'QuoteLead not found' });
      }
      res.status(200).json(updatedQuoteLead);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete an QuoteLead by ID (DELETE)
  export const deleteQuoteLeads = async (req, res) => {
    try {
      const deletedQuoteLead = await QuoteLead.findByIdAndDelete(req.params.id);
      if (!deletedQuoteLead) {
        return res.status(404).json({ message: 'QuoteLead not found' });
      }
      res.status(200).json({ message: 'QuoteLead deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };