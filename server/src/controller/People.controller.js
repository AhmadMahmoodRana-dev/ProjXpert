import { People } from '../model/PeopleForm.model.js'

export const getPeople = async (req, res) => {
    try {
        const result = await People.find()
        res.status(201).json({
            message: result,
        })
    } catch (error) {
        res.json({
            error: error,
        })
    }
}

export const postPeople = async (req, res) => {
    try {
        const data = req.body
        const result = await People.create(data)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({
            error: error,
        })
    }
}

export const getSinglePeople = async (req, res) => {
    try {
        const result = await People.findById(req.params.id)
        if (!result) {
            return res.status(404).json({ message: 'People not found' })
        }
        res.json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const deletePeople = async (req, res) => {
    try {
        const result = await People.findByIdAndDelete(req.params.id)
        if (!result) {
            return res.status(404).json({ message: 'People is Deleted' })
        }
        res.json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const updatePeopleData = async (req, res) => {
    try {
        const id = req.params.id
        const { firstName, lastName, company, country, phone, email } = req.body
        const updatedPeople = await People.findByIdAndUpdate(
            id,
            {
                firstName,
                lastName,
                company,
                country,
                phone,
                email,
            },
            { new: true }
        )
        res.status(201).json(updatedPeople)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
