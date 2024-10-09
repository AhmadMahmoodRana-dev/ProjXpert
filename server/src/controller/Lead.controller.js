import { Lead } from '../model/LeadForm.model.js'

export const getLead = async (req, res) => {
    try {
        const result = await Lead.find()
        res.status(201).json({
            message: result,
        })
    } catch (error) {
        res.json({
            error: error,
        })
    }
}

export const postLead = async (req, res) => {
    try {
        const data = req.body
        const result = await Lead.create(data)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({
            error: error,
        })
    }
}

export const getSingleLead = async (req, res) => {
    try {
        const result = await Lead.findById(req.params.id)
        if (!result) {
            return res.status(404).json({ message: 'Lead not found' })
        }
        res.json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const deleteLead = async (req, res) => {
    try {
        const result = await Lead.findByIdAndDelete(req.params.id)
        if (!result) {
            return res.status(404).json({ message: 'Lead is Deleted' })
        }
        res.json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const updateLeadData = async (req, res) => {
    try {
        const id = req.params.id
        const {
            branch,
            type,
            name,
            status,
            source,
            country,
            phone,
            email,
            project,
        } = req.body
        const updatedLead = await Lead.findByIdAndUpdate(
            id,
            {
                branch,
                type,
                name,
                status,
                source,
                country,
                phone,
                email,
                project,
            },
            { new: true }
        )
        res.status(201).json(updatedLead)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// app.get('/api/data', async (req, res) => {
//     const { status } = req.query; // Get status from query parameters
//     try {
//         const data = await Data.find({ status });
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving data', error });
//     }
// });

export const leadStatusFilter = async (req,res) =>{
    const { status } = req.query; 
        try {
            const data = await Lead.find({ status });
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving data', error });
        }
}
export const leadStatusUpdate= async (req,res) =>{
    try {
        const { leadId, newStatus } = req.body;
    
        // Find the lead by ID and update the status
        const updatedLead = await Lead.findByIdAndUpdate(
          leadId,
          { status: newStatus },
          { new: true }
        );
    
        if (!updatedLead) {
          return res.status(404).json({ message: "Lead not found" });
        }
    
        res.json({ message: "Lead status updated successfully", lead: updatedLead });
      } catch (error) {
        res.status(500).json({ message: "Error updating lead status", error });
      }
}
