const {signToken, protect} = require("../config/authMiddleware");
 
const { Provider}=require("../config/db")
 

const addProvider = async (req, res) => {
    try {
        const { providerId, name, specialty, location, contact, qualifications, experience, servicesOffered, languagesSpoken, affiliations, technologicalCapabilities } = req.body;

        // Check if the provider already exists
        const existingProvider = await Provider.findOne({ providerId });
        if (existingProvider) {
            return res.status(400).json({ message: 'Provider already exists' });
        }

        // Create a new provider
        const newProvider = new Provider({
            providerId,
            name,
            specialty,
            location,
            contact,
            qualifications,
            experience,
            servicesOffered,
            languagesSpoken,
            affiliations,
            technologicalCapabilities
        });

        // Save the provider to the database
        await newProvider.save();

        res.status(201).json({ message: 'Provider added successfully', provider: newProvider });
    } catch (error) {
        console.error('Error adding provider:', error);
        res.status(500).json({ message: 'Failed to add provider' });
    }
};




const getProviders = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.body; // Get the page number and limit from request body, default to 1 and 10 respectively if not provided
        const skip = (page - 1) * limit; // Calculate the number of documents to skip

        const count = await Provider.countDocuments();
        const providers = await Provider.find()
            .skip(skip)
            .limit(limit);

        res.json({ count, page, pages: Math.ceil(count / limit), providers });
    } catch (error) {
        console.error('Error fetching providers:', error);
        res.status(500).json({ message: 'Failed to fetch providers' });
    }
};


const viewAllProviders = async (req, res) => {
    try {
        const providers = await Provider.find();
        res.json(providers);
    } catch (error) {
        console.error('Error fetching all providers:', error);
        res.status(500).json({ message: 'Failed to fetch all providers' });
    }
};

const searchProviders = async (req, res) => {
    try {
        const {keyword,page =1, limit = 2 } = req.body;
        
        const regex = new RegExp(keyword, 'i'); // 'i' makes the regex case-insensitive

        const providers = await Provider.find({
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

        res.json(providers);
    } catch (error) {
        console.error('Error searching for providers:', error);
        res.status(500).json({ message: 'Failed to search for providers' });
    }
};

 
/*const updateProvider = async (req, res) => {
    try {
        const { name, specialty, location, contact, qualifications, experience, servicesOffered, languagesSpoken, affiliations, technologicalCapabilities } = req.body;
        const provider = await Provider.findById(req.params.id);
        if (!provider) {
            return res.status(404).json({ message: 'Provider not found' });
        }
        provider.name = name;
        provider.specialty = specialty;
        provider.location = location;
        provider.contact = contact;
        provider.qualifications = qualifications;
        provider.experience = experience;
        provider.servicesOffered = servicesOffered;
        provider.languagesSpoken = languagesSpoken;
        provider.affiliations = affiliations;
        provider.technologicalCapabilities = technologicalCapabilities;
        await provider.save();
        res.json({ message: 'Provider updated successfully', provider });
    } catch (error) {
        console.error('Error updating provider:', error);
        res.status(500).json({ message: 'Failed to update provider' });
    }
};
*/

module.exports={ addProvider, getProviders, searchProviders, viewAllProviders}

