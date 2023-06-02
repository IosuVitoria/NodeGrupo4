const { generateSign } = require("../../utils/jwt");
const { validateEmail, validatePassword, usedEmail, usedUserName } = require("../../utils/validators");
const User = require("../models/users.model");
const bcrypt = require("bcrypt");


const register = async (req, res) => {
    try {
        // Create a new user instance using the provided request body
        const newUser = new User(req.body);
        console.log('he llegao');
        console.log(newUser);
        // Validate the email
        if (!validateEmail(newUser.email)) {
            return res.status(400).json({ message: "Invalid email" });
        }

        // Validate the password
        if (!validatePassword(newUser.password)) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Check if the email is already used
        if (await usedEmail(newUser.email)) {
            return res.status(400).json({ message: "Email already used" });
        }

        // Check if the email is already used
        if (await usedUserName(newUser.userName)) {
            return res.status(400).json({ message: "User name already used" });
        }

        // Encrypt the password
        newUser.password = bcrypt.hashSync(newUser.password, 10);

        // Save the created user to the database
        const createdUser = await newUser.save();

        // Return a success response with the created user
        return res.status(201).json(createdUser);
    } catch (error) {
        // Return a 500 error if an exception occurs
        return res.status(500).json(error);
    }
};


const login = async (req, res) => {
    try {
        // Find user information based on the provided email
        const userInfo = await User.findOne({ email: req.body.email });
        
        if (!userInfo) {
            // If no user is found, return a 404 error with a message
            return res.status(404).json({ message: 'Email is not registered' });
        }

        if (!bcrypt.compareSync(req.body.password, userInfo.password)) {
            // If the provided password does not match the stored password, return a 404 error with a message
            return res.status(404).json({ message: 'Password is incorrect' });
        }

        // Generate a token using user ID and email
        const token = generateSign(userInfo._id, userInfo.email);

        // Return a success response with user information and token
        return res.status(200).json({ user: userInfo, token: token });
    } catch (error) {
        // Return a 500 error if an exception occurs
        return res.status(500).json(error);
    }
};

// Check if a user is currently authenticated and has an active session. 
// In web applications, sessions are used to keep track of user authentication status and store
//  user-specific information across multiple requests.
const checkSession = (req, res) => {
    try {
        // Return a success response with the user stored in the request object
        return res.status(201).json(req.user);
    } catch (error) {
        return res.status(500).json(error); 
    }
}

module.exports = {login, register, checkSession};