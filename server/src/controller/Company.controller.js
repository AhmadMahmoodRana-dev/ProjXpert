import { Company } from '../model/CompanyForm.model.js'

export const getCompany = async (req, res) => {
    try {
        const result = await Company.find()
        res.status(201).json({
            message: result,
        })
    } catch (error) {
        res.json({
            error: error,
        })
    }
}

export const postCompany = async (req, res) => {
    try {
        const data = req.body
        const result = await Company.create(data)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({
            error: error,
        })
    }
}

export const getSingleCompany = async (req, res) => {
    try {
        const result = await Company.findById(req.params.id)
        if (!result) {
            return res.status(404).json({ message: 'Company not found' })
        }
        res.json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const deleteCompany = async (req, res) => {
    try {
        const result = await Company.findByIdAndDelete(req.params.id)
        if (!result) {
            return res.status(404).json({ message: 'Company is Deleted' })
        }
        res.json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const updateCompanyData = async (req, res) => {
    try {
        const id = req.params.id
        const { name, website, contact, country, phone, email } = req.body
        const updatedCompany = await Company.findByIdAndUpdate(
            id,
            {
                name,
                website,
                contact,
                country,
                phone,
                email,
            },
            { new: true }
        )
        res.status(201).json(updatedCompany)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
