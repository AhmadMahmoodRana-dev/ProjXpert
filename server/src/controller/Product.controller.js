import { Product } from "../model/Product.model.js"

export const postProduct = async (req, res) => {
    try {
        const data = req.body
        const result = await Product.create(data)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({
            error: error,
        })
    }
}

export const getProduct = async (req, res) => {
    try {
        const result = await Product.find()
        res.status(201).json({
            message: result,
        })
    } catch (error) {
        res.json({
            error: error,
        })
    }
}

// // Get a single invoice by ID (GET)
export  const getSingleProduct = async (req, res) => {
    try {
      const invoice = await Product.findById(req.params.id);
      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
      res.status(200).json(invoice);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update an invoice by ID (PUT)
 export const updateProduct = async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const deleteProduct = async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product  not found' });
      }
      res.status(200).json({ message: 'Product  deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };