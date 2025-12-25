const UserModel = require("../models/userModel.js");
exports.getSignUp = (req, res) => {
    res.render("signUp");
}
exports.getLogin = (req, res) => {
    res.render("login");
}

exports.signUpUser = async (req, res) => {
    try {
        // console.log(req.body);
        const userData = new UserModel(req.body);
        await userData.save();
        res.redirect("/auth");
    } catch (error) {
        console.log(error)
    }
}

exports.loginUser = async (req, res) => {
    try {
        const credentials = req.body;
        // console.log(credentials);
        const loginUser = await UserModel.findOne(credentials);
        // console.log(loginUser);
        if (!loginUser) {
            return res.send("invalid user Name or Password...!");
        }
        res.cookie("check", loginUser.id, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
}

exports.logOut = (req, res) => {
    res.clearCookie("check");
    res.redirect("/auth");
}