import { Company } from "../model/CompanyForm.model.js"
import { Customer } from "../model/Customer.model.js"

export const getCustomer = async (req, res) => {
    try {
        const result = await Customer.find()
        res.status(201).json({
            message: result,
        })
    } catch (error) {
        res.json({
            error: error,
        })
    }
}

export const postCustomer = async (req, res) => {
    try {
        const data = req.body
        const result = await Customer.create(data)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({
            error: error,
        })
    }
}