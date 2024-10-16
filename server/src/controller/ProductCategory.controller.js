import { ProductCategory } from "../model/ProductCategory.model.js"

export const postProductCategory = async (req, res) => {
    try {
        const data = req.body
        const result = await ProductCategory.create(data)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({
            error: error,
        })
    }
}

export const getProductCategory = async (req, res) => {
    try {
        const result = await ProductCategory.find()
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
export  const getSingleProductCategory = async (req, res) => {
    try {
      const invoice = await ProductCategory.findById(req.params.id);
      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
      res.status(200).json(invoice);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update an invoice by ID (PUT)
 export const updateProductCategory = async (req, res) => {
    try {
      const updatedProductCategory = await ProductCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedProductCategory) {
        return res.status(404).json({ message: 'ProductCategory not found' });
      }
      res.status(200).json(updatedProductCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const deleteProductCategory = async (req, res) => {
    try {
      const deletedProductCategory = await ProductCategory.findByIdAndDelete(req.params.id);
      if (!deletedProductCategory) {
        return res.status(404).json({ message: 'Product Category not found' });
      }
      res.status(200).json({ message: 'Product Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };