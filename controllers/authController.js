const UserModel = require("../models/userModel.js");

// Render signup page
const renderSignUpPage = (req, res) => {
    res.render("signUp");
};

// Render login page
const renderLoginPage = (req, res) => {
    res.render("login");
};

// Register new user
const registerUser = async (req, res) => {
    try {
        const userData = new UserModel(req.body);
        await userData.save();
        res.redirect("/auth");
    } catch (error) {
        console.log(error);
        res.status(500).send("Signup failed or User already registered");
    }
};

// Authenticate user
const authenticateUser = async (req, res) => {
    try {
        const credentials = req.body;
        const user = await UserModel.findOne(credentials);

        if (!user) {
            return res.send("Invalid username or password!");
        }

        res.cookie("check", user.id, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        });

        res.redirect("/admin");
    } catch (error) {
        console.log(error);
    }
};

// Logout user
const logoutUser = (req, res) => {
    res.clearCookie("check");
    res.redirect("/");
};

module.exports = {
    renderSignUpPage,
    renderLoginPage,
    registerUser,
    authenticateUser,
    logoutUser
};
