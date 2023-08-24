const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

const login = async (req, res) => {
    const {email: login, password} = req.body;
    const user = await User.findOne({email: login});

    if (!user) {
        return res.status(404).send({message: "email/password incorrect"});
    }
    const isValid = bcrypt.compare(password, user.password);

    if (!isValid) {
        return res.status(404).send({message: "email/password incorrect"});
    }

    const {password: hashedPassword, ...userInfo} = user.toJSON();
    debugger
    const token = jwt.sign(
        {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            _id: userInfo._id,
        },
        process.env.JWT_SECRET
    );

    res.send({
        token,
        user: userInfo,
    });
};

const register = async (req, res) => {
    const {password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        ...req.body,
        password: hashedPassword,
    });
    user.firstName = req.body.name?.split(" ")[0];
    user.lastName = req.body.name?.split(" ").slice(1).join(" ");

    const token = jwt.sign(
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            _id: req.body._id,
        },
        process.env.JWT_SECRET
    );
    await user.save();

    res.send({
        token,
        user: user
    });
};

const verify = (_, res) => {
    res.send("Verified");
};
const logout = (_, res) => {
    res.send("logout");
};

module.exports = {login, register, verify, logout};
