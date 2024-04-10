'use strict';
require('dotenv').config();

const jwt = require('jsonwebtoken');


// Use function keyword or arrow function, not both
function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}




const { User } = require("./db");

const protect = async (req, res, next) => {
  //const token = req.header('Authorization');
 // token = req.headers.authorization.split(" ")[1];
 // console.log(req.headers);
  if (req.headers.authorization) {
    // Split the authorization header to get the token
    const token = req.headers.authorization.split(" ")[1];
    console.log('Received Token:', token);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your actual secret key
      //console.log('Decoded Token:', decoded);
  
      
      const user = await User.findById(decoded.id).select("-password");
  
  
      if (!user) {
        return res.status(401).json({ msg: 'User not found' });
      }
  
      req.user = user;
     // console.log(user);
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ msg: 'Token is not valid' });
    }
    // Now you can proceed to use the token as needed
    // (e.g., verifying the token, extracting user information, etc.)
} else {
    // Handle the case where the authorization header is not present
    // Respond with an error or take appropriate action based on your application's logic
    res.status(401).json({ error: "Authorization header missing" });
}

  //if (!token) {
    //return res.status(401).json({ msg: 'No token, authorization denied' });
  //}

  
};
 


module.exports = {signToken, protect};


  