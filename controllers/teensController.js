//API for metabolic health services

const { Service}=require("../config/db")
 

const addService = async (req, res) => {
    try {
        const { name, description, category, serviceProviders, cost, treatmentMethods, duration } = req.body;

        // Check if the service already exists
        const existingService = await Service.findOne({ name });
        if (existingService) {
            return res.status(400).json({ message: 'Service already exists' });
        }

        // Create a new service
        const newService = new Service({
            name,
            description,
            category,
            serviceServices,
            cost,
            treatmentMethods,
            duration
        });

        // Save the service to the database
        await newService.save();

        res.status(201).json({ message: 'Service added successfully', service: newService });
    } catch (error) {
        console.error('Error adding service:', error);
        res.status(500).json({ message: 'Failed to add service' });
    }
};


const getService = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.body; // Get the page number and limit from request body, default to 1 and 10 respectively if not provided
        const skip = (page - 1) * limit; // Calculate the number of documents to skip

        const count = await Service.countDocuments();
        const services = await Service.find()
            .skip(skip)
            .limit(limit);

        res.json({ count, page, pages: Math.ceil(count / limit), services });
    } catch (error) {
        console.error('Error fetching servicess:', error);
        res.status(500).json({ message: 'Failed to fetch servicess' });
    }
};


const viewAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        console.error('Error fetching all services:', error);
        res.status(500).json({ message: 'Failed to fetch all services' });
    }
};


const searchServices = async (req, res) => {
    try {
        const {keyword,page =1, limit = 2 } = req.body;
        
        const regex = new RegExp(keyword, 'i'); // 'i' makes the regex case-insensitive

        const services = await Service.find({
            $or: [
                { name: regex },
                { specialty: regex },
                { location: regex },
                { qualifications: regex }, // Include any other fields you want to search
                { servicesOffered: { $in: [regex] } }, // Search within array fields
                { languagesSpoken: { $in: [regex] } },
                { affiliations: { $in: [regex] } },
                { technologicalCapabilities: { $in: [regex] } }
            ]
        });

        res.json(services);
    } catch (error) {
        console.error('Error searching for Services:', error);
        res.status(500).json({ message: 'Failed to search for Services' });
    }
};

 /*
const updateService = async (req, res) => {
    try {
        const { name, specialty, location, contact, qualifications, experience, servicesOffered, languagesSpoken, affiliations, technologicalCapabilities } = req.body;
        const services = await Service.findByIdAndUpdate(name)
        if (!services) {
            return res.status(404).json({ message: 'Service not found' });
        }
        service.name = name;
        service.specialty = specialty;
        service.location = location;
        service.contact = contact;
        service.qualifications = qualifications;
        service.experience = experience;
        service.servicesOffered = servicesOffered;
        service.languagesSpoken = languagesSpoken;
        service.affiliations = affiliations;
        service.technologicalCapabilities = technologicalCapabilities;
        await service.save();
        res.json({ message: 'Service updated successfully', service });
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ message: 'Failed to update service' });
    }
};*/


module.exports = { addService, getService, viewAllServices, searchServices };
