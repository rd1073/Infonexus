const { Blog }=require("../config/db")


const addBlog = async (req, res) => {
    try {
        const { title, content, author, date, tags, categories } = req.body;

        // Check if the blog post already exists
        const existingBlog = await Blog.findOne({ title });
        if (existingBlog) {
            return res.status(400).json({ message: 'Blog post already exists' });
        }

        // Create a new blog post
        const newBlog = new Blog({
            title,
            content,
            author,
            date,
            tags,
            categories
        });

        // Save the blog post to the database
        await newBlog.save();

        res.status(201).json({ message: 'Blog post added successfully', blog: newBlog });
    } catch (error) {
        console.error('Error adding blog post:', error);
        res.status(500).json({ message: 'Failed to add blog post' });
    }
};

const getBlogs = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.body; // Get the page number and limit from request body, default to 1 and 10 respectively if not provided
        const skip = (page - 1) * limit; // Calculate the number of documents to skip

        const count = await Blog.countDocuments();
        const blogs = await Blog.find()
            .skip(skip)
            .limit(limit);

        res.json({ count, page, pages: Math.ceil(count / limit), blogs });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ message: 'Failed to fetch blogs' });
    }
};


const viewAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        console.error('Error fetching all blogs:', error);
        res.status(500).json({ message: 'Failed to fetch all blogs' });
    }
};


const searchBlogs = async (req, res) => {
    try {
        const { keyword, page = 1, limit = 10 } = req.body;

        const regex = new RegExp(keyword, 'i'); // 'i' makes the regex case-insensitive

        const blogs = await Blog.find({
            $or: [
                { title: regex },
                { content: regex },
                { author: regex },
                { tags: { $in: [regex] } },
                { categories: { $in: [regex] } }
            ]
        });

        res.json(blogs);
    } catch (error) {
        console.error('Error searching for blogs:', error);
        res.status(500).json({ message: 'Failed to search for blogs' });
    }
};


module.exports = { addBlog,searchBlogs, getBlogs,viewAllBlogs };
