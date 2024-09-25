import { People } from "../model/PeopleForm.model.js"

export const getPeople = async (req,res) =>{
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