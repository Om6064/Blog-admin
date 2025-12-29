const UserModel = require("../models/userModel.js");

const getSignUp = (req, res) => {
    res.render("signUp");
};

const getLogin = (req, res) => {
    res.render("login");
};

const signUpUser = async (req, res) => {
    try {
        const userData = new UserModel(req.body);
        await userData.save();
        res.redirect("/auth");
    } catch (error) {
        console.log(error);
        res.status(500).send("Signup failed or User already Register");
    }
};

const loginUser = async (req, res) => {
    try {
        const credentials = req.body;
        const loginUser = await UserModel.findOne(credentials);
        if (!loginUser) {
            return res.send("invalid user Name or Password...!");
        }
        res.cookie("check", loginUser.id, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        });
        res.redirect("/admin");
    } catch (error) {
        console.log(error);
    }
};

const logOut = (req, res) => {
    res.clearCookie("check");
    res.redirect("/");
};

module.exports = {
    getSignUp,
    getLogin,
    signUpUser,
    loginUser,
    logOut
};
