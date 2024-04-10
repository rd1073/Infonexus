


const {signToken, protect} = require("../config/authMiddleware");
 
const { User }=require("../config/db")

const bcrypt = require("bcrypt");

 

//signup a user withemail and password
/*const Signup = async (req, res) => {
    try {
      const {  password, email, name } = req.body;
      //console.log("Request Body:", req.body);
  
      if ( !password || !email ) {
        res.status(400).json({ error: "Please enter all the fields" });
        return;
      }
  
       const userExists = await User.findOne({ email });
  
      if (userExists) {
        res.status(400).json({ error: "Email is already taken" });
        return;
      }
  
       const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user instance
      const newUser = new User({
        email,
        password: hashedPassword,
        name,
        
      });
  
      // Save the user instance to the database
      const user = await newUser.save();
  
      console.log("User saved:", user);
  
      res.status(201).json({
        _id: user._id,
     
        email: user.email,
     
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error probably" });
    }
  };*/





  
  const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
          return res.status(400).json({ msg: "Identifier and password are required" });
        }

   
        let user = await User.findOne({
          
            email
                  });
    
       
    
         if (!user) {
          return res.status(404).json({ msg: "User not found" });
        }
    


        //console.log(user);

        if (user && (await bcrypt.compare(password, user.password))) {
          console.log("login succesful");
          const token= signToken(user._id)
          
          res.status(200).json({
            _id: user._id,
            name: user.name,
            token,
            email:user.email,
            msg:"login is succesfull",
        });
           
        } else{
          res.status(401);
          throw new Error("Invalid Username or Password");
  
        }

         
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
      }};


      const registerUser = async (req, res) => {
        try {
            const { username, email, password, dateOfBirth, gender, location, contactInfo } = req.body;
    
            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
    
            // Create a new user
            const newUser = new User({
                username,
                email,
                password,
                dateOfBirth,
                gender,
                location,
                contactInfo
            });
    
            // Save the user to the database
            await newUser.save();
    
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Failed to register user' });
        }
    };
    
    const getUserDetails = async (req, res) => {
      try {
           const user = req.user;
          if (!user) {
              return res.status(401).json({ message: 'User not authenticated' });
          }
  
          // If user is authenticated, you can fetch their details from the database
          const userDetails = await User.findById(user.id);
          if (!userDetails) {
              return res.status(404).json({ message: 'User not found' });
          }
  
          res.json(userDetails);
      } catch (error) {
          console.error('Error fetching user details:', error);
          res.status(500).json({ message: 'Failed to fetch user details' });
      }
  };
    
  module.exports={ registerUser, Login, getUserDetails}
  